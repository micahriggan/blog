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
