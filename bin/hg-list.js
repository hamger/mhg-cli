#!/usr/bin/env node
const chalk = require('chalk')
const request = require('request')
const logger = require('../lib/logger')

/**
 * Padding.
 */

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * List repos.
 */

request({
  url: 'https://api.github.com/repos/hamger/mhg-templates/contents/templates.json',
  headers: {
    'content-type': 'application/json',
    'User-Agent': 'mhg-cli'
  }
}, (err, res, body) => {
  if (err) logger.fatal(err)
  const content = JSON.parse(new Buffer(JSON.parse(body).content, 'base64').toString())
  if (Array.isArray(content)) {
    console.log('  Available official templates:')
    console.log()
    content.forEach(repo => {
      console.log(
        '  ' + chalk.yellow('★') +
        '  ' + chalk.blue(repo.name) +
        ' - ' + repo.description)
    })
  } else {
    console.error(content.message)
  }
})
