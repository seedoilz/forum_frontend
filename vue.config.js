//引入path连接路径
const path = require('path')
const resolve = dir => path.join(__dirname, dir)


module.exports = {
  configureWebpack: config =>{
    if(process.env.NODE_ENV === 'production'){

      return {
        resolve: {
          alias: {
            '@': resolve('src')
          }
        },
        devServer: {
          port: 3457,
          // open: true,
          host:"123.249.100.181",
          proxy: {
            '/api': {
              target: 'http://123.249.100.181:3456',
              ws: true,
              changeOrigin: true,
              pathRewrite:{
                '^/api': ''
              }
            }
          }
        }
      }

    }else{
      return {
        resolve: {
          alias: {
            '@': resolve('src')
          }
        },
        devServer: {
          port: 3457,
          // open: true,
          host:"localhost",
          proxy: {
            '/api': {
              target: 'http://localhost:3456',
              ws: true,
              changeOrigin: true,
              pathRewrite:{
                '^/api': ''
              }
            }
          }
        }
      }
    }
  }
};
