// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;


/* 饿了么UI */
import "element-ui/lib/theme-chalk/index.css";
import "@/style/reset-element-ui.scss";
import Message from "element-ui/lib/message";
Vue.prototype.$message = Message;
import Loading from "element-ui/lib/loading";
Vue.prototype.$loading = Loading;



/* 全局变量 */
import GLOBAL from "@/common/GLOBAL";
Vue.prototype.$global = GLOBAL;


/* 自定义样式 */
import "@/style/common.scss";

/* axios配置 */
import "@/common/axios.config";


// console.log();
// process.nextTick(function(){console.log('嘿嘿')})

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>"
});
