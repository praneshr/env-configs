import expect from 'expect'

const deleteCache = () => {
  delete process.env.NODE_ENV
  delete process.env.ENV_CONFIGS_DIR
  delete require.cache[require.resolve('../')]
}
describe(`Testing 'env-configs'`, () => {
  describe(`\n\tTesting with '.js' files`, () => {
    describe('\n\tDefault location \'./configs\'', () => {
      afterEach(deleteCache)

      it('Should return valid object when a \'default.js\' is found under the configs directory', () => {
        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: {
              e: [5,6,7,8],
            },
          },
        }
        expect(config).toEqual(expected)
      })

      it('Should return a merged object when the NODE_ENV is set', () => {

        process.env.NODE_ENV = 'production'

        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: 'override',
          },
        }
        expect(config).toEqual(expected)
      })

      it('Should return default config when a matching file for supplied NODE_ENV is found', () => {

        process.env.NODE_ENV = 'nothing'

        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: {
              e: [5,6,7,8],
            },
          },
        }
        expect(config).toEqual(expected)
      })

    })


    describe('\n\tCustom location \'./test/test-js/configs\'', () => {
      afterEach(deleteCache)
      it('Should return empty object when no \'default.js\' is found under the configs directory', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-js/no-configs'
        }
        const config = require('../').default
        expect(config).toEqual({})
      })

      it('Should return valid object when a \'default.js\' is found under the configs directory', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-js/configs'
        }
        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: {
              e: [5,6,7,8],
            },
          },
        }
        expect(config).toEqual(expected)
      })

      it('Should return a merged object when the NODE_ENV is set', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-js/configs',
          NODE_ENV: 'production',
        }
        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: 'override',
          },
        }
        expect(config).toEqual(expected)
      })

      it('Should return default config when a matching file for supplied NODE_ENV is found', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-js/configs',
          NODE_ENV: 'nothng',
        }
        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: {
              e: [5,6,7,8],
            },
          },
        }
        expect(config).toEqual(expected)
      })
    })
  })

  describe(`\n\tTesting with '.json' files`, () => {

    describe('\n\tCustom location \'./test/test-json/configs\'', () => {

      afterEach(deleteCache)

      it('Should return empty object when no \'default.js\' is found under the configs directory', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-json/no-configs'
        }
        const config = require('../').default
        expect(config).toEqual({})
      })

      it('Should return valid object when a \'default.json\' is found under the configs directory', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-json/configs'
        }
        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: {
              e: [5,6,7,8],
            },
          },
        }
        expect(config).toEqual(expected)
      })

      it('Should return a merged object when the NODE_ENV is set', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-json/configs',
          NODE_ENV: 'production',
        }
        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: 'override',
          },
        }
        expect(config).toEqual(expected)
      })

      it('Should return default config when a matching file for supplied NODE_ENV is found', () => {
        process.env = {
          ENV_CONFIGS_DIR: '/test/test-json/configs',
          NODE_ENV: 'nothng',
        }
        const config = require('../').default
        const expected = {
          a: 'env-configs',
          b: [1, 2, 3, 4],
          c: {
            d: {
              e: [5,6,7,8],
            },
          },
        }
        expect(config).toEqual(expected)
      })
    })
  })
})