"use strict";
/**
 * Given an array of objects of some type T, and a valid key of T
 * return an object where the keys are values from each element of the array
 * the values are selected by the key given by indexWithKey
 *
 * @example:
 *  indexBy([{name: 'bob'}, {name: 'carol'}], 'name'):
 *    =>
 *     {bob: {name: 'bob'}, carol: {name: 'carol'}}
 */
function indexBy(objects, indexWithKey) {
    // define an object where the keys are strings and the values are type T 
    const indexed = {};
    for (const obj of objects) {
        const indexValue = obj[indexWithKey];
        indexed[indexValue.toString()] = obj;
    }
    return indexed;
}
function indexByTest() {
    const Micah = { name: 'Micah' };
    const Someone = { name: 'someone else' };
    const people = [Micah, Someone];
    const firstNameLookup = indexBy(people, "name");
    console.log(JSON.stringify(firstNameLookup, null, 2));
    // the following would be invalid, because the objects don't have an age property
    // const invalidLookup = indexBy(people, 'age');
}
/*
 * LOGS:
 *{
 *  "Micah": {
 *    "name": "Micah"
 *  },
 *    "someone else": {
 *      "name": "someone else"
 *    }
 *}
 */
indexByTest();
