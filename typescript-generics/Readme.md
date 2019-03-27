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
/* given an object of type T,
 * log the value of a property, specified by the argument key
 */
function logValue<T>(obj: T, key: keyof T) {
  console.log(obj[key]);
}

function simpleTest() {
  const Micah = {name: 'Micah'};
  logValue(Micah, "name")
  // The following would be invalid because "age" is not a key of Micah
  // logValue(Micah, "age")
}
/*
 * LOGS
 * Micah
 *
 */
simpleTest();

```

The benefit we gain here is if we attempt to log an invalid key, we'll get a compile error. This prevents typos and other invalid key errors. We can only specify a valid key as the second argument to logValue.
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
  cars.getColumn("modelName");
  cars.getColumn("year");
  cars.getColumn("age"); // [undefined, undefined]

}

/*
 * LOGS
 * [ 'Micah' ]
 */
```


## Example 3: Type Safe Table
In the previous example, we were allowed to make a typo, and also attempt to get a column for keys that aren't on our types. In this example I've commented out the lines that we're no longer allowed to write due to the type-checking.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Car {
  modelName: string;
  year: number;
}

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
  //people.addRow({name: 'Micah'});
  people.addRow({name: 'Micah', age: 25});

  const cars = new Table<Car>();
  cars.addRow({modelName: 'Toyota Something or Other', year: 2010});
  //cars.addRow({modelNme: 'Honda Something or Other', year: 2010});
  cars.getColumn("modelName");
  cars.getColumn("year");
  //cars.getColumn("age");
}

testTable();
```


## Conclusion
By using generics we can define functions, classes, or types which work with whatever type, and still retain type safety.
