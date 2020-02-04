/**
 * 把node相关的变量注入到页面
 * 1. 在本页声明属性
 * 2. webpack.base.conf.js中已经用插件(webpack.ProvidePlugin)处理了本文件
 * 3. 页面中直接使用 __inject 变量
 */

let isProduction = process.env.NODE_ENV === 'production' /* 是否是生产环境 */
export {
  isProduction
} 


