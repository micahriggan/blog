---
title: {Destructuring} = JavaScript
published: true
description: Common Destructuring Patterns in JavasScript
tags: javascript,destructuring
---

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

{% gist https://gist.github.com/micahriggan/2fe963033267bef56422ed3dae01ce63 %}
    


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

{% gist https://gist.github.com/micahriggan/51fd9db1cc9b09fd8041072da8cf87ef %}

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

{% gist https://gist.github.com/micahriggan/869d42a2e22a105fc491c1882ef11fc9 %}

## Outputs
```
[ 'Hello', 'World' ]
Micah
[ 'Second', 'Third' ]
[ 'First', 'Second' ]
```

## Conclusion
If you haven't been using destructuring, you should try it out. It's a great way to boil objects down into what you need. If you've got a favorite destructure that I didn't cover, put it down in the comments
