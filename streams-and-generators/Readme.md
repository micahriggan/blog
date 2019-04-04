# Streams and Generators
In javascript we sometimes have to deal with large sets of data that come in asynchrounously. 

Two tools we can use to do this are streams and generators.

Generators yield data, and continue logic after each yielded item is consumed.



ReadableStreams are the same in that data proceeds to flow as you consume it.

Both of these are great for consuming data as it comes in, and creating flows of data.

In this post, I'd like to show some examples of both of these, side by side, and  talk about how to create and consume both forms.


## Example 1: Creating and Consuming
In this example we're generating random strings about every 100ms. We'll have a readable stream that we can subscribe to, and a generator that we can iterate over.

We'll call `getStream` and `getGenerator` to get these.,

```javascript
const stream = require('stream');

function getRandomString() {
  return (Math.random() * 16).toString(16)
}

function getStream(time) {
  class TimeStream extends stream.Readable {
    constructor(time) {
      super();
      this.setMaxListeners(100);
      this.streamEnds = Date.now() + time;
    }
    _read(size) {
      setTimeout(() => {
        if(Date.now() < this.streamEnds) {
          this.push(getRandomString());
        } else {
          this.push(null);
        }
      }, 100);
    }
  }
  return new TimeStream(time);
}

function* getGenerator(time) {
  const streamEnds = Date.now() + time;
  while(Date.now() < streamEnds) {
    yield new Promise(resolve => {
      setTimeout(() => {
        resolve(getRandomString());
      }, 100)
    });
  }
}

function testStream() {
  return new Promise(resolve => {
    let i = 0;
    console.time('stream');
    const ds = getStream(1000);
    ds.on('data', (data) => console.log(i++, data.toString()));
    ds.on('end', () => {
      console.log(i++, 'end');
      console.timeEnd('stream')
      resolve();
    });
  });
}

async function testGenerator() {
  let i = 0;
  console.time('generator');
  const generator = getGenerator(1000);
  for(const asyncData of generator) {
    const data = await asyncData;
    console.log(i++, data)
  }
  console.timeEnd('generator');
}

async function main() {
  console.log('Testing stream...');
  await testStream();
  console.log();
  console.log('Testing async generator...');
  await testGenerator();
}

if(require.main === module) {
  main();
}
module.exports = getStream;
```


### Outputs

```
Testing stream...
0 'e.d244c32e8623'
1 '5.b1684670615e'
2 '7.a3ccc5ad7cd5'
3 '1.30698269b999'
4 'a.0df84371e841'
5 'e.04b9ee941ba'
6 'f.b4e328ecf36f'
7 '2.a3834203577d'
8 'f.472469520bcf'
9 'end'
stream: 1027.421ms

Testing async generator...
0 'c.a0345feebe33'
1 '1.3feb27ad4b78'
2 'e.de0f74e641c4'
3 'b.dc5b66f56322'
4 '1.ec8915a4b07c'
5 '2.d94dde53ff09'
6 'd.e8b57a3b028d'
7 '9.6454bafaf36b'
8 '2.01d0ada9e78a'
9 '7.5142faf39563'
generator: 1034.700ms
```

From this example, we can see async generators are very small to define. 

Generator consumpiton also fits well with async await and for loops.

We can also see from the output that one of the 100ms iterations was used to close stream by pushing null.


## Example 2: Converting a Stream to a Generator
In the last example, we could use a for loop with the generator. In this next example, we'll build an adapter from ReadableStream to Generator. This will allow us to use a for loop on the stream.

We'll have a function called `getStreamAdapter` which takes in a stream, and yields promises which will resolve when the next item comes on the stream.


```javascript
const getStream = require('./data-stream');

function* getStreamAdapter(stream) {
  let done = false;
  stream.on('end', d => {done = true})
  while(!done) {
    yield new Promise((resolve, reject) =>{
      stream.once('data', resolve);
      stream.once('end', resolve);
    });
  }
}

async function testDataGenerator() {
  let i = 0;
  console.time('generator');
  const stream = getStream(1000)
  for (const asyncData of getStreamAdapter(stream)) {
    const data = await asyncData;
    if(data) {
      console.log(i++, data.toString());
    }
  }
  console.timeEnd('generator');
}

if(require.main === module) {
  console.log("Creating a async Generator from a Stream");
  testDataGenerator();
}

module.exports = getStreamAdapter;
```

### Outputs
```
Creating a async Generator from a Stream
0 '6.91038da597eb'
1 '3.ffab4d6c03c4'
2 'c.4d1902e3275f'
3 '3.3b9299bc7c4f'
4 'b.d20e4a03ee2a'
5 '2.9990aca111e6'
6 '5.55a87b7f0c29'
7 '0.a79c544e914d'
8 'e.1cb8d9d24eea'
generator: 1035.196ms
```

Note, in this example, if we didn't await in the loop, the generator would continue to yield promises. All of those promises would resolve when the next value came in over the stream.

If we tried a typical Promise.all parallelization, we'd end up with an array of the same values.

## Example 3: Transform Stream + Transform Generator
Transform streams are one of my favorite uses for streams. In this example I'll try to show the generator equivalent.

For this example we'll create a transform stream that outputs the length of each item as it flows through

We'll also create a generator that consumes another generator and outputs the same thing.

```javascript
const {Transform} = require('stream');
const getStream = require('./data-stream');
const toGenerator = require('./stream-conversion');

function getLengthTransformStream(stream) {
  return stream.pipe(new Transform({
    objectMode:  true,
    transform: (data, encoding, cb) => {
      cb(null, data.toString().length);
    }
  }));
}

function* getLengthTransformGenerator(generator) {
  for(const item of generator) {
    if(item.then) {
      yield item.then(i => i && i.toString().length);
    } else {
      yield item && item.toString().length;
    }
  }
}
function testTransformStream() {
  return new Promise(resolve => {
    const timedStream = getStream(1000);
    getLengthTransformStream(timedStream)
      .on('error', console.log)
      .on('data', console.log)
      .on('end', resolve);
  });
}

async function testTransformGenerator() {
  const timedGenerator = toGenerator(getStream(1000));
  const lengthGenerator = getLengthTransformGenerator(timedGenerator);
  for(const asyncLength of lengthGenerator) {
    const length = await asyncLength;
    if(length !== undefined) {
      console.log(length);
    }
  }
}

async function main() {
  console.log('Testing TransformStream...');
  await testTransformStream();
  console.log();
  console.log('Testing TransformGenerator...');
  await testTransformGenerator();
}

if(require.main === module) {
  main();
}
```

### Outputs

```
Testing TransformStream...
14
14
14
14
14
14
14
13
14

Testing TransformGenerator...
13
14
14
14
14
14
14
13
14
```

## Conclusion

Streams and generators are powerful ways of dealing with data as it comes in. If you need something quick that will be consumed by async await and for loops, use a generator. If your code is interfacing with other streams, then use a stream. Pipes and transforms make streams extremely useful together.
