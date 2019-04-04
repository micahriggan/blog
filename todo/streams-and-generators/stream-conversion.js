const getDataStream = require('./data-stream');

function* getStreamAdapter(ds) {
  let done = false;
  ds.on('end', d => {done = true})
  while(!done) {
    yield new Promise((resolve, reject) =>{
      ds.once('data', resolve);
      ds.once('end', resolve);
    });
  }
}

async function testDataGenerator() {
  let i = 0;
  console.time('generator');
  const ds = getDataStream(1000)
  for (const asyncData of getStreamAdapter(ds)) {
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
