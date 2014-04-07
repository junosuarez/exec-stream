var Stream = require('stream')
var spawn = require('child_process').spawn

function execStream (cmd, args, options) {
  var AB = new Stream.Duplex
  var A = new Stream.PassThrough
  var B = new Stream.PassThrough

// console.log = function () {}

  AB._write = function (chunk, encoding, cb) {
    return A.write(chunk, encoding, cb)
  }

  AB.on('finish', function () {
    A.end()
  })

  AB._read = function (n) {
  }

  B.on('readable', function() {
    AB.push(B.read())
  })

  B.on('end', function () {
    AB.push(null)
  })


  var proc = spawn(cmd, args, options)


  A.pipe(proc.stdin)
  proc.stdout.pipe(B)

  return AB
}

module.exports = execStream
