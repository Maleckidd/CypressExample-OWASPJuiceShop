const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: 'fixtures',
  screenshotsFolder: 'screenshots',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000/',
    specPattern: 'JuiceShopTests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/index.js',
  },
})
