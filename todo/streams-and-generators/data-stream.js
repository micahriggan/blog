const stream = require('stream');

function getDataStream (time) {
  class TimeStream extends stream.Readable {
    constructor(time) {
      super();
      this.setMaxListeners(100);
      this.time = time;
      this.streamEnds = Date.now() + time;
    }
    _read(size) {
      const id = setTimeout(() => {
        try  {
          if(Date.now() < this.streamEnds) {
            const randomBuff = (Math.random() * 16).toString(16)
            this.push(randomBuff);
          } else {
            this.push(null);
          }
        } catch(e) {
          this.emit('error', e);
        }
      }, 100);
    }
  }
  return new TimeStream(time);
}

function testDataStream() {
  let i = 0;
  console.time('stream');
  const ds = getDataStream(1000);
  ds.on('data', (data) => console.log(i++, data));
  ds.on('end', () => console.timeEnd('stream'));
}

if(require.main === module) {
  testDataStream();
}
module.exports = getDataStream;
