import fs from 'fs'
import path from 'path'

const logger = (type, msg) => {
  const isSilent = process.env.SUPPRESS_ENV_CONFIGS_WARNINGS == 'true' || false
  const loggerConfig = {
    warning: {
      type: 'warn',
      color: '\x1b[33m%s\x1b[0m',
    },
    error: {
      type: 'error',
      color: '\x1b[31m%s\x1b[0m',
    },
  }

  !isSilent
    && console[loggerConfig[type.toLowerCase()].type]
      .apply(null, [loggerConfig[type.toLowerCase()].color, msg])

}

const readEnvConf = (env, cwd, configsPath) => {
  const envJsPath = path.join(configsPath, `${env}.js`)
  const envJsonPath = path.join(configsPath, `${env}.json`)
  const envJsExists = fs.existsSync(envJsPath)
  const envJsonExists = fs.existsSync(envJsonPath)
  if (envJsExists || envJsonExists) {
    if (envJsExists) {
      return require(envJsPath)
    }
    try {
      return require(envJsonPath)
    } catch (e) {
      logger('error', `[Error]: JSON parse failed`)
      throw new Error(e)
    }
  } else {
    logger('warning', `[Warning]: No config file for environment '${env}' found at '${configsPath}'. Returning 'default' config.`)
    return {}
  }
}
const envConfigs = () => {
  const ENV = process.env.NODE_ENV || 'default'
  const ENV_CONFIGS_DIR = process.env.ENV_CONFIGS_DIR || '/configs'
  const CWD = process.cwd()
  const CONFIGS_PATH = path.join(CWD, ENV_CONFIGS_DIR)
  /***
   * Get the default config from the ENV_CONFIG_DIR
   *
   * The config can be a js file or a json file.
   *
   ***/
  const defaultJsPath = path.join(CONFIGS_PATH, 'default.js')
  const defaultJsonPath = path.join(CONFIGS_PATH, 'default.json')
  const defaultJsExists = fs.existsSync(defaultJsPath)
  const defaultJsonExists = fs.existsSync(defaultJsonPath)

  if (defaultJsExists || defaultJsonExists) {
    let defaultconfig
    if (defaultJsExists) {
      defaultconfig = require(defaultJsPath)
    } else {
      try {
        defaultconfig = require(defaultJsonPath)
      } catch (e) {
        logger('error', `[Error]: JSON parse failed`)
        throw new Error(e)
      }
    }
    const envConfig = readEnvConf(ENV.toLowerCase(), CWD, CONFIGS_PATH)
    return {...defaultconfig, ...envConfig}
  } else {
    logger('error', `[Error]: No 'Default' config file found at '${CONFIGS_PATH}'`)
    return {}
  }
}

export default envConfigs()