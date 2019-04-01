function anyLogValue(obj, key) {
    console.log(obj[key]);
}
function genericLogValue(obj, key) {
    console.log(obj[key]);
}
function simpleTest() {
    const Micah = { name: 'Micah' };
    genericLogValue(Micah, "name");
    // genericLogValue(Micah, "age")
    // would not compile because "age" is not a key of Micah
    anyLogValue(Micah, "age");
}
simpleTest();
