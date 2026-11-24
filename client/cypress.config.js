const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // save a video of the test
  video: true,
  e2e: {
    // my live site
    baseUrl: 'https://sara-aboudeeb-portfolio.vercel.app',
    supportFile: false,
    // wait more time, the free server is slow at first
    defaultCommandTimeout: 60000
  }
});