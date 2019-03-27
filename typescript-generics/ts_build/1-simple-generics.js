"use strict";
/* given an object of type T,
 * log the value of a property, specified by the argument key
 */
function logValue(obj, key) {
    console.log(obj[key]);
}
function simpleTest() {
    const Micah = { name: 'Micah' };
    logValue(Micah, "name");
    // The following would be invalid because "age" is not a key of Micah
    // logValue(Micah, "age")
}
/*
 * LOGS
 * Micah
 *
 */
simpleTest();
