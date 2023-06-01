const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1839,
  viewportHeight: 1100,
  e2e: {
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.madeiramadeira.com.br',

    retries: 0,
    watchForFileChanges: false
  
  },

  
});
