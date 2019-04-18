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

- [simple](https://github.com/hamger/mhg-templates/tree/simple) - A template of ES6 dedevelopment with webpack + babel-loader.

- [pages](https://github.com/hamger/mhg-templates/tree/pages) - A template of dedevelopment in multiple pages with webpack + babel-loader + eslint + sass.

- [package](https://github.com/hamger/mhg-templates/tree/package) - A template of dedevelopment in javascript package with webpack + babel-loader + eslint.

- [vue](https://github.com/hamger/mhg-templates/tree/vue) - A template of vue with webpack + vue + vuex + hot reload + linting + testing + css extraction.

- [ele-admin](https://github.com/hamger/mhg-templates/tree/ele-admin) - A template of content management system with vue + element-ui.

- [react](https://github.com/hamger/mhg-templates/tree/react) - A template of react with webpack + react + react-router4 + redux + less.

## Custom Templates

It's unlikely to make everyone happy with the official templates. You can simply fork an official template and then use it via `hg-cli` with:

```bash
hg init username/repo my-project
```

Where `username/repo` is the GitHub repo shorthand for your fork.

The shorthand repo notation is passed to [download-git-repo](https://github.com/flipxfx/download-git-repo) so you can also use things like `bitbucket:username/repo` for a Bitbucket repo and `username/repo#branch` for tags or branches.

## Change Log

### 2019.4.18

> v1.1.0 show list via request

### 2018.5.22

> v1.0.1 init project
