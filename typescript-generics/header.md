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

