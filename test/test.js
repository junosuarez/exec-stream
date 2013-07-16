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
})

function Sink(cb) {
  var sink = new Stream.Writable
  sink.data = ''
  sink._write = function (chunk, encoding, cb) {
    sink.data += chunk.toString(encoding !== 'buffer' ? encoding : undefined)
    cb()
  }
  sink.on('pipe', function (src) {
    src.on('end', function () {
      sink.emit('end')
    })
  })

  sink.on('end', function () {
    cb(sink.data)
  })

  return sink
}