const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
const render = require('consolidate').handlebars.render
const path = require('path')
const multimatch = require('multimatch')
const getOptions = require('./options')
const ask = require('./ask')
const filter = require('./filter')
const logger = require('./logger')

// 注册 handlebars 指令
Handlebars.registerHelper('if_eq', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
  return a === b ? opts.inverse(this) : opts.fn(this)
})

/**
 * Generate a template given a `src` and `dest`.
 * @param {String} name
 * @param {String} src 模板地址
 * @param {String} dest 项目地址
 * @param {Function} done
 */
module.exports = function generate (name, src, dest, done) {
  // 读取模板的配置
  const opts = getOptions(name, src)
  // 初始化 Metalsmith 对象，规定使用 template 里的模板
  const metalsmith = Metalsmith(path.join(src, 'template'))
  // 添加一些变量至 metalsmith 中，并获取 metalsmith 中全部变量
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
  })

  opts.helpers &&
    Object.keys(opts.helpers).map(key => {
      Handlebars.registerHelper(key, opts.helpers[key])
    })

  const helpers = { chalk, logger }

  if (opts.metalsmith && typeof opts.metalsmith.before === 'function') {
    // 执行 before 钩子
    opts.metalsmith.before(metalsmith, opts, helpers)
  }

  // 指定中间件
  metalsmith
    .use(askQuestions(opts.prompts)) // 询问问题
    .use(filterFiles(opts.filters)) // 过滤文件
    .use(renderTemplateFiles(opts.skipInterpolation)) // 填充模板

  if (typeof opts.metalsmith === 'function') {
    opts.metalsmith(metalsmith, opts, helpers)
  } else if (opts.metalsmith && typeof opts.metalsmith.after === 'function') {
    // 执行 after 钩子
    opts.metalsmith.after(metalsmith, opts, helpers)
  }

  metalsmith
    .clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(dest)
    .build((err, files) => {
      done(err)
      if (typeof opts.complete === 'function') {
        const helpers = { chalk, logger, files }
        opts.complete(data, helpers)
      } else {
        logMessage(opts.completeMessage, data)
      }
    })

  return data
}

/**
 * 创建询问问题的中间件
 * @param {Object} prompts
 * @return {Function}
 */
function askQuestions (prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

/**
 * 创建过滤文件的中间件
 * @param {Object} filters
 * @return {Function}
 */
function filterFiles (filters) {
  return (files, metalsmith, done) => {
    filter(files, filters, metalsmith.metadata(), done)
  }
}

/**
 * Template in place plugin.
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
function renderTemplateFiles (skipInterpolation) {
  // 保证 skipInterpolation 是一个数组
  skipInterpolation =
    typeof skipInterpolation === 'string'
      ? [skipInterpolation]
      : skipInterpolation
  return (files, metalsmith, done) => {
    const keys = Object.keys(files)
    // 获取用户输入的数据
    const metalsmithMetadata = metalsmith.metadata()
    async.each(
      keys,
      (file, next) => {
        // 异步处理所有files
        // 跳过符合skipInterpolation的要求的file
        if (
          skipInterpolation &&
          multimatch([file], skipInterpolation, { dot: true }).length
        ) {
          return next()
        }
        const str = files[file].contents.toString()
        // 跳过没有合法 handlebars 语法的文件
        if (!/{{([^{}]+)}}/g.test(str)) {
          return next()
        }
        // 渲染文件
        render(str, metalsmithMetadata, (err, res) => {
          if (err) {
            err.message = `[${file}] ${err.message}`
            return next(err)
          }
          files[file].contents = new Buffer(res)
          next()
        })
      },
      done
    )
  }
}

/**
 * 展示模版加载完后的信息
 *
 * @param {String} message
 * @param {Object} data
 */
function logMessage (message, data) {
  if (!message) return
  render(message, data, (err, res) => {
    if (err) {
      console.error(
        '\n   Error when rendering template complete message: ' +
          err.message.trim()
      )
    } else {
      console.log(
        '\n' +
          res
            .split(/\r?\n/g)
            .map(line => '   ' + line)
            .join('\n')
      )
    }
  })
}
