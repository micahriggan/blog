:[header](header.md)

ReadableStreams are the same in that data proceeds to flow as you consume it.

Both of these are great for consuming data as it comes in, and creating flows of data.

In this post, I'd like to show some examples of both of these, side by side, and  talk about how to create and consume both forms.


## Example 1: Creating and Consuming
In this example we're generating random strings about every 100ms. We'll have a readable stream that we can subscribe to, and a generator that we can iterate over.

We'll call `getStream` and `getGenerator` to get these.,

```javascript
:[data-stream](data-stream.js)
```


### Outputs

```
:[data-stream.txt](data-stream.txt)
```

From this example, we can see async generators are very small to define. 

Generator consumpiton also fits well with async await and for loops.

We can also see from the output that one of the 100ms iterations was used to close stream by pushing null.


## Example 2: Converting a Stream to a Generator
In the last example, we could use a for loop with the generator. In this next example, we'll build an adapter from ReadableStream to Generator. This will allow us to use a for loop on the stream.

We'll have a function called `getStreamAdapter` which takes in a stream, and yields promises which will resolve when the next item comes on the stream.


```javascript
:[adapter](stream-conversion.js)
```

### Outputs
```
:[adapter](stream-conversion.txt)
```

Note, in this example, if we didn't await in the loop, the generator would continue to yield promises. All of those promises would resolve when the next value came in over the stream.

If we tried a typical Promise.all parallelization, we'd end up with an array of the same values.

## Example 3: Transform Stream + Transform Generator
Transform streams are one of my favorite uses for streams. In this example I'll try to show the generator equivalent.

For this example we'll create a transform stream that outputs the length of each item as it flows through

We'll also create a generator that consumes another generator and outputs the same thing.

```javascript
:[transform](transform-stream.js)
```

### Outputs

```
:[transform-stream](transform-stream.txt)
```

## Conclusion

Streams and generators are powerful ways of dealing with data as it comes in. If you need something quick that will be consumed by async await and for loops, use a generator. If your code is interfacing with other streams, then use a stream. Pipes and transforms make streams extremely useful together.
