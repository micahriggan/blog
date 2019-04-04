const getDataStream = require('./data-stream');

function* getDataGenerator() {
  const ds = getDataStream(1000)
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
  for (const asyncData of getDataGenerator()) {
    const data = await asyncData;
    if(data) {
      console.log(i++, data);
    }
  }
  console.timeEnd('generator');
}

if(require.main === module) {
  testDataGenerator();
}

module.exports = getDataGenerator;
