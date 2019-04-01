function anyLogValue(obj: any, key: string) {
  console.log(obj[key]);
}

function genericLogValue<T>(obj: T, key: keyof T) {
  console.log(obj[key]);
}

function simpleTest() {
  const Micah = {name: 'Micah'};
  genericLogValue(Micah, "name")
  // genericLogValue(Micah, "age")
  // would not compile because "age" is not a key of Micah
  anyLogValue(Micah, "age");
}

simpleTest();

