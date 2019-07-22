import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Upload from "@/pages/upload";
import RedPackage from "@/pages/redpackage";

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "HelloWorld",
    //   component: HelloWorld
    // },
    {
      path: "/",
      name: "upload",
      component: Upload
    },
    {
      path: '/game/redpackage',
      name: 'redpackage',
      component: RedPackage
    }
  ]
});
