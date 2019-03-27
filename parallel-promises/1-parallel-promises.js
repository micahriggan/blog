function wait(waitTime) {
  return new Promise(resolve => setTimeout(() => {
    console.log(`waited ${waitTime} ms`)
    resolve()
  }, waitTime));
}

async function serial() {
  console.time('serial');
  await wait(1000);
  await wait(1000);
  await wait(1000);
  console.timeEnd('serial');
}

async function parallel() {
  console.time('parallel');
  await Promise.all([
    wait(1000),
    wait(1000),
    wait(1000)
  ])
  console.timeEnd('parallel');
}


async function test() {
  await serial();
  await parallel();
}

test();
