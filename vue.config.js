const {    defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        allowedHosts: 'all'
    }
/*    devServer:{
      proxy:'http://shuttle.dev2.rastreo.gs:9000'
    }
*/
})