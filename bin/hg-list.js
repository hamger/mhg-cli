#!/usr/bin/env node
const chalk = require('chalk')

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

const templates = [
  {
    name: 'simple',
    description: 'A template of ES6 dedevelopment with webpack + babel-loader.'
  },
  {
    name: 'pages',
    description:
      'A template of dedevelopment in multiple pages with webpack + babel-loader + eslint + sass.'
  },
  {
    name: 'package',
    description:
      'A template of dedevelopment in javascript package with webpack + babel-loader + eslint.'
  },
  {
    name: 'vue',
    description:
      'A template of vue with webpack + vue + vuex + hot reload + linting + testing + css extraction.'
  },
  {
    name: 'ele-admin',
    description:
      'A template of content management system with vue + element-ui.'
  },
  {
    name: 'react',
    description:
      'A template of react with webpack + react + react-router4 + redux + less.'
  }
]

console.log('  Available official templates:')
console.log()
templates.forEach(repo => {
  console.log(
    '  ' +
      chalk.yellow('★') +
      '  ' +
      chalk.blue(repo.name) +
      ' - ' +
      repo.description
  )
})
