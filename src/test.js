const branch = require('git-branch')

branch().then(name => {
  console.log('branch name:', name)
})

