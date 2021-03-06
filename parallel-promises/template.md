:[header](header.md)

## Example 1: "Wait a second" x 3

First example, lets define a function where we "wait a second", three times in a row.

This function will be called serial.

After that, we'll call the "wait a second" function, three times in parallel

This function will be called parallel

```javascript
:[parallel-promises](1-parallel-promises.js)
```



### Output
```
waited 1000 ms
waited 1000 ms
waited 1000 ms
serial: 3016.319ms
waited 1000 ms
waited 1000 ms
waited 1000 ms
parallel: 1003.017ms
```

From the output we can see Promise.all enables us to do all of the "wait a second" calls at the same time.

## Example 2: Add two async numbers
In the previous example, we just waited a second. In this example we'll get two numbers asynchronously and add them together, serially and in parallel.

```javascript
:[data](2-data-dependencies.js)
```

### Output
```
add-serial: 2005.019ms
serial result: 59.0316729944722
add-parallel: 1000.616ms
parallel result: 48.7190841367634
```

## Example 3: Required Data Dependencies

In the last example, we had to add numbers which were returned asynchronously, but we still haven't had an example where an asynchronous value is required before another asynchronous value could be retrieved.

In this example, we'll get our username, and then we'll fetch two pieces of information which depend on our username.

```javascript
:[data](3-async-dependencies.js)
```


### Output
```
userData-serial: 3007.785ms
userData-parallel: 2006.665ms
```
## Conclusion

In order to optimize your code for speed, pay attention to which data is required to make calls, and then structure your code to where as many of those dependencies are fetched in parallel as possible with Promise.all()

Note: At some point, you may attempt to do too many async things at once. Now you've got to determine how many you can do, and create batches of that size to prevent thrashing. That's a post for another time.
