var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var postcss = []
if(isProduction){
  postcss.push(require('autoprefixer')({
    browsers: ['last 2 versions']
  }))
}
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: postcss
}
