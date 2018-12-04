const crypto = require('crypto')

function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex').toString('utf8')
}

function sortArg (args) {
  const str = Object.keys(args).sort((a, b) => a === b ? 0 : a > b ? 1 : -1).map(key => `${key}=${args[key]}`).join('&')

  // 将key拼接在最后
  // const stringSignTemp = `${str}&key=${key}`
  return md5(str)
}

