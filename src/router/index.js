import Vue from "vue";
import Router from "vue-router";

// import Upload from "@/pages/upload";
// import Lyric from "@/pages/upload/lyric";


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "upload",
      // component: Upload,
      component: () => import('@/pages/upload')
    },
    {
      /* 页面: 上传图片到 databasing:/www/lyric/lyrics/ */
      path: "/lyric",
      name: "lyricUpload",
      // component: Lyric,
      component: () => import('@/pages/upload/lyric')
    }
  ]
});
