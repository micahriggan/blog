# Typescript\<Generics>

Typescript is great for developer experience. 

You get real-time feedback about the validity of your code, and self documenting code via type-annotations. Also, the auto-complete and jump to definition features are game changing for speed.

In Typescript you write logic in terms of types. Sometimes you need to write logic that is valid for multiple types. One common example is an Array. You can have an Array of any type of thing.

```typescript
Array<string>
Array<number>
Array<Array<number>>
Array<{name: string}>
```


This concept is called a template type, or a generic. Here's an example of a linked list type

```typescript
type LinkedNode<T> = { next: LinkedNode<T> | null, value: T }
type LinkedList<T> = { head: LinkedNode<T> }
```

In this post I want to show some examples, and contrast the code safety from using "any" versus "templates"

## Example 1: Log Obj[key]
In this example, logValue takes and object, and a key of that object. It logs the value associated with the key on that object.

```typescript
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

```

### Outputs
```
Micah
undefined
```

The benefit we gain here is if we attempt to log an invalid key, we'll get a compile error.

This prevents typos and other invalid key errors. We can only specify a valid key as the second argument to logValue.
```typescript
// Example Compile Error
logValue(Micah, "age");
```

## Example 2: Non-Type-Safe Table
In this example we've got two types of data we're dealing with.  Person, and Car. We have this BadTable class to help us work with lists of these types as if they were a column row data structure.

See if you can spot the errors you're allowed to create with BadTable

```typescript
interface Person {
  name: string;
  age: number;
}

interface Car {
  modelName: string;
  year: number;
}

class BadTable {
  rows = new Array<any>()

  addRow(row: any) {
    this.rows.push(row);
  }

  getColumn(col: keyof any) {
    return this.rows.map(r => r[col]);
  }
}
function testBadTable() {
  const people = new BadTable()
  people.addRow({name: 'Micah'});
  people.addRow({name: 'Micah', age: 25});

  const cars = new BadTable();
  cars.addRow({modelName: 'Toyota Something or Other', year: 2010});
  cars.addRow({modelNme: 'Honda Something or Other', year: 2010});
  console.log(cars.getColumn("modelName"));
  console.log(cars.getColumn("year"));
  console.log(cars.getColumn("age")); // [undefined, undefined]
}

testBadTable();
```
### Outputs
```typescript
[ 'Toyota Something or Other', undefined ]
[ 2010, 2010 ]
[ undefined, undefined ]
```


## Example 3: Stepping towards Generics
In the previous example, we were allowed to make a typo, and also attempt to get a column for keys that aren't on our types. 

In this example we'll start moving towards a stronger typed table, that isn't generic. This will create some logic duplication.

In the process of generalization, we need to identify repeated logic, even when it comes to types

```typescript
export interface Person {
  name: string;
  age: number;
}

export interface Car {
  modelName: string;
  year: number;
}

class PersonTable {
  rows = new Array<Person>();
  addRow(row: Person) {
    this.rows.push(row);
  }
  getColumn(col: keyof Person) {
    return this.rows.map(r => r[col]);
  }
}


class CarTable {
  rows = new Array<Car>();
  addRow(row: Car) {
    this.rows.push(row);
  }
  getColumn(col: keyof Car) {
    return this.rows.map(r => r[col]);
  }
}

function testTables() {
  const people = new PersonTable()
  //people.addRow({name: 'Micah'});
  people.addRow({name: 'Micah', age: 25});

  const cars = new CarTable();
  cars.addRow({modelName: 'Toyota Something or Other', year: 2010});
  //cars.addRow({modelNme: 'Honda Something or Other', year: 2010});
  cars.getColumn("modelName");
  cars.getColumn("year");
  //cars.getColumn("age");
}

testTables();
```

## Example 4: Learning about Generics
In our previous example we can see we had to implement a new Table per type in order to retain type safety.

This duplication should be a signal that we can generalize.

### Generics! 
In typescript you can create a generic class, which allows you to pass types in as variables!

```typescript
class MyClass<TypeVar> {
  myProp: TypeVar;
}
type GenericType<TypeVar> = TypeVar & {modified: boolean}
function genericFn<TypeVar>(arg: TypeVar) {}
```

Now that we have the ability to define type variables, lets revise our duplicated classes

### Generic Table

```typescript
import { Person, Car } from "./3-generalization-step-1";

class Table<RowType> {
  rows = new Array<RowType>();

  addRow(row: RowType) {
    this.rows.push(row);
  }

  getColumn(col: keyof RowType) {
    return this.rows.map(r => r[col]);
  }
}

function testTable() {
  const people = new Table<Person>()
  people.addRow({name: 'Micah', age: 25});

  const cars = new Table<Car>();
  cars.addRow({modelName: 'Toyota Something or Other', year: 2010});
  cars.getColumn("modelName");
  cars.getColumn("year");
}

testTable();
```


## Conclusion
Types help prevent common bugs. 

By using `generics<T>` we can define functions, classes, or types which work with variable types. 
This allows us to write logic that holds for many types.

To generalize code, we need to identify repeated logic, even when it comes to types.
