var execStream = require('./index.js')

process.stdin
  .pipe(execStream('cat', process.argv.slice(2)))
  .pipe(process.stdout)