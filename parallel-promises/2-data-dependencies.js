function randomNumber() {
  const rand = Math.random() * 100;
  return new Promise(resolve => setTimeout(() => {
    resolve(rand)
  }, 1000))
}

async function addExampleSerial() {
  console.time('add-serial');
  const number1 = await randomNumber();
  const number2 = await randomNumber();
  const result = number1 + number2;
  console.timeEnd('add-serial');
  console.log('serial result: ', result);
}


async function addExampleParallel() {
  console.time('add-parallel');
  const [number1, number2] = await Promise.all([randomNumber(), randomNumber()]);
  const result = number1 + number2;
  console.timeEnd('add-parallel');
  console.log('parallel result: ', result);
}

async function test() {
  await addExampleSerial();
  await addExampleParallel();
}

test();
