# mhg-cli

A simple CLI for scaffolding some projects.

### Installation

``` bash
$ npm install -g mhg-cli
```

### Usage

``` bash
$ hg init <template-name> <project-name>
```

Example:

``` bash
$ hg init vue my-project
```

The above command pulls the template from [mhg-templates](https://github.com/hamger/mhg-templates), prompts for some information, and generates the project at `./my-project/`.

### Official Templates
Current available templates include:

- [vue](https://github.com/hamger/mhg-templates/tree/vue) - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.

- [simple](https://github.com/hamger/mhg-templates/tree/simple) - A simple Webpack + babel-loader setup for the develop with ES6.

- [cms](https://github.com/hamger/mhg-templates/tree/cms) - A template of content management system with Vue.js and element.js.

### Custom Templates
It's unlikely to make everyone happy with the official templates. You can simply fork an official template and then use it via `hg-cli` with:

``` bash
hg init username/repo my-project
```

Where `username/repo` is the GitHub repo shorthand for your fork.

The shorthand repo notation is passed to [download-git-repo](https://github.com/flipxfx/download-git-repo) so you can also use things like `bitbucket:username/repo` for a Bitbucket repo and `username/repo#branch` for tags or branches.
