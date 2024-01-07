const { defineConfig } = require("@vue/cli-service");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path');
module.exports = defineConfig({
  devServer: {
    client: {
      overlay: false
    }
  },
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
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  }
});