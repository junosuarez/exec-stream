# exec-stream
stream to a child process

## usage
```js
var execStream = require('exec-stream')

// a strawman wrapper of `cat`

process.stdin
  .pipe(execStream('cat', process.argv.slice(2)))
  .pipe(process.stdout)
```
available as `example.js` in the package root.


## api

`execStream: (command: String, args?: Array, opts?: Object) => DuplexStream`

The returned [`DuplexStream`](http://nodejs.org/api/stream.html#stream_class_stream_duplex) is the stdin and stdout of the execd process.


## installation

    $ npm install exec-stream


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>


## license

MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md
