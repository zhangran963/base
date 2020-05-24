# website-of-foundation-server

> 通用的基础的服务站

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 开发状态

本地页面服务器: localhost:8080
本地服务服务器: localhost:8000

```js
// 1. /config/index.js
proxyTable: {
    "/base": {
        target: "http://127.0.0.1:8000", // 转端口
        changeOrigin: true // 跨域
    }
}
// 2.
// mongod-start: 启动 mongodb
```

### 生产状态

```js
// 1. nginx静态服务器: /home/ran/www/base/
// 2. 页面请求接口统一到 https://api.thesoundofsilence.top/base
// 3. nginx 转到 服务器:8000
```
