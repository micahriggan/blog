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
