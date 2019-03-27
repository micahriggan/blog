function getPeople() {
  return [{name: "Bob"}, {name: "Sam"}, {name: "Tom"}];
}
function test1() {
  const [firstPerson] = getPeople();
  console.log(firstPerson);
}
function test2() {
  const [firstPerson, ...rest] = getPeople(); 
  console.log(rest);
}
function test3() {
  const [{name}] = getPeople(); 
  console.log(name);
}
function test4() {
  const [{name: firstName}] = getPeople(); 
  console.log(firstName);
}
function test5() {
  const [_, secondPerson] = getPeople();
  console.log(secondPerson);
}
test1();
test2();
test3();
test4();
test5();
