const match = require('minimatch')
const evaluate = require('./eval')

module.exports = (files, filters, data, done) => {
  if (!filters) return done()

  const fileNames = Object.keys(files)
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if (match(file, glob, { dot: true })) {
        const condition = filters[glob]
        // 将匹配的文件过滤
        if (!evaluate(condition, data)) {
          delete files[file]
        }
      }
    })
  })
  done()
}
