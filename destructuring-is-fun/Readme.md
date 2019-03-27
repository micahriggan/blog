# {Destructuring} = JavaScript

Destructuring is great for referencing pieces of objects or arrays. I find it to be very useful, and fun.

If you're writing code like

```javascript
var thing = array[0];
var otherThing = array[1];
```
*or*
```javascript
var name = thing.name;
var age = thing.age;
var height = thing.height;
var userId = thing.id;
```
Then you've come to the right place. 

In this post I'll show some common uses of destructuring that simplify the above examples, and more.


# Example 1: Destructuring Arrays

Here are some common array destructuring patterns :


* Get the first element of an array
* Get the first element, and the rest of the elements
* Get the name property from the first element of the array
* Get the name property and then assign it to a variable called firstName
* Get the second element from the array


```javascript
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
```


## Outputs
```
{ name: 'Bob' }
[ { name: 'Sam' }, { name: 'Tom' } ]
Bob
Bob
{ name: 'Sam' }
```
# Example 2: Destructuring Objects
Here are some common object destructuring patterns
* Get the title property of an object
* Get the title and pages property of an object
* Get the height property off an object, and name it bookHeight
* Get the ISBN property, which will default to '0000000'
* Get the title property, and everything else collected into a variable named rest

```javascript 
const Book = {
  title: 'A book title',
  pages: 55,
  height: 100,
  weight: 2,
  price: 3.50
};
function test1() {
  const {title} = Book;
  console.log(title);
}
function test2() {
  const {title, pages} = Book;
  console.log({title, pages});
}
function test3() {
  const {height: bookHeight} = Book;
  console.log(bookHeight);
}
function test4() {
  const {ISBN = '0000000'} = Book;
  console.log(ISBN);
}
function test5() {
  const {title, ...rest} = Book;
  console.log(rest);
}
test1();
test2();
test3();
test4();
test5();
```

## Outputs
```
A book title
{ title: 'A book title', pages: 55 }
100
0000000
{ pages: 55, height: 100, weight: 2, price: 3.5 }
```

# Example 3: Destructuring Parameters
In this example we've got some common destructuring patterns for function parameters
* Capturing many arguments in an array
* Getting the name property of an object
* Getting the first element of an array, and the remainder of the array
* Unpacking an array into a new array, with a new element at the end

```javascript
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
```

## Outputs
```
[ 'Hello', 'World' ]
Micah
[ 'Second', 'Third' ]
[ 'First', 'Second' ]
```

## Conclusion
If you haven't been using destructuring, you should try it out. It's a great way to boil objects down into what you need. If you've got a favorite destructure that I didn't cover, put it down in the comments
