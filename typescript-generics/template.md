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
:[simple](1-simple-generics.ts)
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
:[bad-table](2-bad-table-example.ts)
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
:[generalization](3-generalization-step-1.ts)
```

## Example 4: Learning about Generics
In our previous example we can see we had to implement a new Table per type in order to retain type safety.

This duplication should be a signal that we can generalize.

### Generics! 
In typescript you can create a generic class, which allows you to pass types in as variables!

```typescript
:[generics](4-generics-definition.ts)
```

Now that we have the ability to define type variables, lets revise our duplicated classes

### Generic Table

```typescript
:[generic-table](4-generic-table-example.ts)
```


## Conclusion
Types help prevent common bugs. By using `generics<T>` we can define functions, classes, or types which work with variable types. This is powerful because it allows us to write logic that holds for many types
