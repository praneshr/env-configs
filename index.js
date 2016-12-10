'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = function logger(type, msg) {
  var isSilent = process.env.SUPPRESS_WARNINGS == 'true' || false;
  var loggerConfig = {
    warning: {
      type: 'warn',
      color: '\x1b[33m%s\x1b[0m'
    },
    error: {
      type: 'error',
      color: '\x1b[31m%s\x1b[0m'
    }
  };

  !isSilent && console[loggerConfig[type.toLowerCase()].type].apply(null, [loggerConfig[type.toLowerCase()].color, msg]);
};

var readEnvConf = function readEnvConf(env, cwd, configsPath) {
  var envJsPath = _path2.default.join(configsPath, env + '.js');
  var envJsonPath = _path2.default.join(configsPath, env + '.json');
  var envJsExists = _fs2.default.existsSync(envJsPath);
  var envJsonExists = _fs2.default.existsSync(envJsonPath);
  if (envJsExists || envJsonExists) {
    if (envJsExists) {
      return require(envJsPath);
    }
    return require(envJsonPath);
  } else {
    logger('warning', '[Warning]: No config file for environment \'' + env + '\' found at \'' + configsPath + '\'. Returning \'default\' config.');
    return {};
  }
};
var envConfigs = function envConfigs() {
  var ENV = process.env.NODE_ENV || 'default';
  var ENV_CONFIGS_DIR = process.env.ENV_CONFIGS_DIR || '/configs';
  var CWD = process.cwd();
  var CONFIGS_PATH = _path2.default.join(CWD, ENV_CONFIGS_DIR);
  /***
   * Get the default config from the ENV_CONFIG_DIR
   *
   * The config can be a js file or a json file.
   *
   ***/
  var defaultJsPath = _path2.default.join(CONFIGS_PATH, 'default.js');
  var defaultJsonPath = _path2.default.join(CONFIGS_PATH, 'default.json');
  var defaultJsExists = _fs2.default.existsSync(defaultJsPath);
  var defaultJsonExists = _fs2.default.existsSync(defaultJsonPath);

  if (defaultJsExists || defaultJsonExists) {
    var defaultconfig = void 0;
    if (defaultJsExists) {
      defaultconfig = require(defaultJsPath);
    } else {
      defaultconfig = require(defaultJsonPath);
    }
    var envConfig = readEnvConf(ENV.toLowerCase(), CWD, CONFIGS_PATH);
    return _extends({}, defaultconfig, envConfig);
  } else {
    logger('error', '[Error]: No \'Default\' config file found at \'' + CONFIGS_PATH + '\'');
    return {};
  }
};

exports.default = envConfigs();
