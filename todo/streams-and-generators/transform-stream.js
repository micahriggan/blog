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
