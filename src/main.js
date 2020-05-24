// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from "vue";
import App from "./App";
import router from "./router";

// Vue.config.productionTip = false;


/* 饿了么UI */
// import "element-ui/lib/theme-chalk/index.css";
// import Message from "element-ui/lib/message";
// Vue.prototype.$message = Message;
// import Loading from "element-ui/lib/loading";
// Vue.prototype.$loading = Loading;

Vue.prototype.$message = ELEMENT.Message;
Vue.prototype.$loading = ELEMENT.Loading;
import "@/style/reset-element-ui.scss";


/* 全局变量 */
// import GLOBAL from "@/common/GLOBAL";
// Vue.prototype.$global = GLOBAL;


/* 自定义样式 */
import "@/style/index.scss";

/* axios配置 */
import "@/common/axios.config";

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

// if(process.env.NODE_ENV === "production"){
// }

new VConsole();
