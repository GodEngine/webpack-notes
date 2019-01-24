// const fs = require('fs')
// const path = require('path')
const _ = require('lodash')

console.log(_.join(['a', 'b', 'lodash'], ' '))
// console.log('asdf', path.join(__dirname + './print.js'))

// fs.readFile(path.join(__dirname, './print.js'), {
//   encoding: 'utf8',
// }, function(err, data) {
//   console.log(data)
// })

// const buffersd = new Buffer(300)
// fs.open('./print.js', 'r', function(err, data) {
//   fs.read(data, buffersd, 0, buffersd.size, 0, function(err, bys, buffer) {
//     if (err) {
//       console.log('err', err)
//     }
//     console.log('by', bys);
//     console.log('buffer', buffersd.toString());
//   })
// })
