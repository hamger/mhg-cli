# mhg-cli

A simple CLI for scaffolding some projects.

## Installation

```bash
$ npm install -g mhg-cli
```

## Usage

```bash
$ hg init <template-name> <project-name>
```

Example:

```bash
$ hg init pages my-project
```

The above command pulls the template from [mhg-templates](https://github.com/hamger/mhg-templates).

## Current available templates

- [simple](https://github.com/hamger/mhg-templates/tree/simple) - webpack + babel-loader, for developing with ES6.

- [pages](https://github.com/hamger/mhg-templates/tree/pages) - webpack + babel-loader + eslint + sass, for developing in multiple pages.

- [package](https://github.com/hamger/mhg-templates/tree/package) - webpack + babel-loader + eslint, for developing in javascript package.

- [vue](https://github.com/hamger/mhg-templates/tree/vue) - webpack + vue-loader + vuex + hot reload + linting + testing + css extraction.

- [cms](https://github.com/hamger/mhg-templates/tree/cms) - A template of content management system with Vue.js and element.js.

## Custom Templates

It's unlikely to make everyone happy with the official templates. You can simply fork an official template and then use it via `hg-cli` with:

```bash
hg init username/repo my-project
```

Where `username/repo` is the GitHub repo shorthand for your fork.

The shorthand repo notation is passed to [download-git-repo](https://github.com/flipxfx/download-git-repo) so you can also use things like `bitbucket:username/repo` for a Bitbucket repo and `username/repo#branch` for tags or branches.
