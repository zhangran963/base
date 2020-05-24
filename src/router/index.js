// import Vue from "vue";
// import Router from "vue-router";

// import Upload from "@/pages/upload";
// import Lyric from "@/pages/upload/lyric";

Vue.use(VueRouter);

export default new VueRouter({
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
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/pages/404")
    },
    {
      path: '/sticky/top1',
      name: 'stickyTop',
      component: () => import('@/pages/sticky/top1')
    },
    {
      path: '/sticky/top2',
      name: 'stickyTop',
      component: () => import('@/pages/sticky/top2')
    },{
      path: "*",
      redirect: "/404"
    }
  ]
});
