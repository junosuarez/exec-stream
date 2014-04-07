var chai = require('chai')
chai.should()
var Stream = require('stream')
var literal = require('literal-stream')

describe('exec-stream', function () {
  var exec = require('../')

  it('is a pipeable process', function (done) {

// var peekIn = new Stream.Transform
// peekIn._transform = function (chunk, encoding, cb) {
//   console.log('<', chunk.toString())
//   peekIn.push(chunk, encoding)
//   cb()
// }
// var peekOut = new Stream.Transform
// peekOut._transform = function (chunk, encoding, cb) {
//   console.log('>', chunk.toString())
//   peekOut.push(chunk, encoding)
//   cb()
// }

  literal('meow')
    // .pipe(peekIn)
    .pipe(exec('cat'))
    // .pipe(peekOut)
    .pipe(Sink(function (data) {
      data.should.equal('meow')
      done()
    }))

  })

  it('properly flushes all data', function (done) {
    exec('cat', [__dirname + '/data'])
    .pipe(Sink(function (data, len) {
      len.should.equal(512000)
      done()
    }, { delay: 5 }))
  })
})

function Sink(cb, options) {
  var sink = new Stream.Writable
  var len = 0
  sink.data = ''
  sink._write = function (chunk, encoding, cb) {
    len += chunk.length
    sink.data += chunk.toString(encoding !== 'buffer' ? encoding : undefined)
    if (options && options.delay)
      setTimeout(cb, options.delay)
    else
      cb()
  }
  sink.on('pipe', function (src) {
    src.on('end', function () {
      sink.emit('end')
    })
  })

  sink.on('end', function () {
    cb(sink.data, len)
  })

  return sink
}
