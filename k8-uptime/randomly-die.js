console.time('alive');
setTimeout(() => {
  console.timeEnd('alive');
  process.exit(0);
}, Math.random() * 60000);
setInterval(() => {
 console.log('feels good to be alive') 
}, 100)
