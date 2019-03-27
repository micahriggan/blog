function log(...args) {
  console.log(args);
}
function getName({name}) {
  console.log(name);
}
function pop([first, ...rest]) {
  return rest;
}
function push(array, elem) {
  return [...array, elem];
}

function test1() {
  log("Hello", "World")
}
function test2() {
  getName({name: 'Micah', points: 100});
}
function test3() {
  console.log(pop(["First", "Second", "Third"]));
}
function test4() {
  console.log(push(["First"], "Second"));
}
test1();
test2();
test3();
test4();
