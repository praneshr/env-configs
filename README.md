# env-configs &nbsp; &nbsp;[![Build Status](https://travis-ci.org/praneshr/env-configs.svg?branch=master)](https://travis-ci.org/praneshr/env-configs)

[![NPM](https://nodei.co/npm/node-env-configs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-env-configs/)

Loads configuration files based on the `NODE_ENV`.

### Installation

```
npm i node-env-configs --save
```

### Simple Usage

Run the following commands at the root of your project

##### Adding `default` config file.

`node-env-configs` by default consumes this file and export the content as the default config when `NODE_ENV` is not set.
```bash
$ mkdir configs
$ vim configs/default.js  # or vim config/default.json
```
```javascript
// default.js

module.exports = {
  protocol: 'http://',
  host: 'localhost',
  port: 8090,
}
```
##### Adding `production` config file.
`node-env-configs` will consume `production.js` and do a [shallow merge](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) over the `default` config.

```bash
$ vim configs/production.js
```

```javascript
// production.js

module.exports = {
  port: 8000
}
```
##### Using in your module
Now, create `main.js` and add the following code.
```javascript
  // ES5 way
  const config = require('node-env-configs').default
  console.log(config.port)

  // ES6 way
  import { port } from 'node-env-configs'
  console.log(port)
```

##### Making it work

By default, when you run `main.js`, `node-env-configs` will check for `NODE_ENV` and look for the filename matching the `NODE_ENV`. If `NODE_ENV` is `undefined` it will pick `default.js | default.json` from the `root/configs/` and return it as the default config. So, here

```bash
$ node main.js
> 8090 #logs 'port' from the 'default.js'
```

If your set the `NODE_ENV=production`,

```bash
$ NODE_ENV=production node main.js
> 8000 #logs 'port' from the 'production.js'
```

### Environment Variables

##### `ENV_CONFIGS_DIR`

**Description:** This specifies `node-env-configs` where the config files are saved in the project.

**Default:** `<projectRoot>/configs/`

**Usage:**
```bash
$ ENV_CONFIGS_DIR=app/configs node main.js # now node-env-configs will look for configs from the specified path
```

##### `SUPPRESS_ENV_CONFIGS_WARNINGS`
**Description:** This specifies `node-env-configs` to do or do not show warnings and errors on the console.

**Default:** `false`

**Usage:**
```bash
$ SUPPRESS_ENV_CONFIGS_WARNINGS=true node main.js # this will suppress all the warnings and the errors
```

### Supported File Formats

`node-env-configs` supports the following file formats
- `.js`
- `.json`

You can have both the formats in the same project or the config directory.

### License
The MIT License (MIT)

Copyright (c) 2016 Pranesh Ravi

<hr/>

<p align="center">
Made with <font color="red">♥</font> by <a href="https://github.com/praneshr">Pranesh Ravi</a>
</p>
