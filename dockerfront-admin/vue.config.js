const { defineConfig } = require("@vue/cli-service");
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "/src/assets/style/globe.scss";`    
      }
    } 
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // Use path.resolve to get the correct absolute path
        'public': path.resolve(__dirname, 'public'), // Alias for public folder
        '@assets': path.resolve(__dirname, 'src/assets'), // Alias for assets folder
      }
    },
  }
});
