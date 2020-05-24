<template>
  <div class="page-404">
    <div class="main">
      <span class="text">404</span>
      <i class="icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style lang="scss" scoped>
@import "@/style/index.scss";
$mainColor: #dd4040;


.page-404 {
  font-family: 'Lato', 'Lucida Grande', 'Lucida Sans Unicode', Tahoma, Sans-Serif;

  height: 80vh;
  @include flex-row(center, center);

  .main {
    color: $mainColor;
    $iconWidth: 28px;
    .text {
      font-size: 4 * $iconWidth;
      display: inline-block;
      transform: rotate(-6deg);
    }

    /** 铁锹 */
    .icon {
      /* 头 */
      width: $iconWidth;
      height: $iconWidth;
      background-color: $mainColor;
      display: inline-block;
      border-radius: 0.25*$iconWidth 0.25*$iconWidth $iconWidth $iconWidth;;

      transform: rotate(26deg);

      position: relative;
      left: 0.5*$iconWidth;
      top: 0.5*$iconWidth;

      &::before, &::after {
        content: "";
        position: absolute;
        box-sizing: border-box;
      }
      /** 手柄 */
      &::before{
        width: 100%;
        height: 100%;
        top: -1.99 * $iconWidth;
        left: 0;
        border: 0.2*$iconWidth solid $mainColor;
        border-radius: 0.2*$iconWidth 0.2*$iconWidth $iconWidth $iconWidth;
      }
      /**茎 */
      &::after{
        width: 0.2*$iconWidth;
        height: $iconWidth;
        left: 50%;
        top: -1 * $iconWidth;
        transform: translateX(-50%);
        background-color: $mainColor;
      }
    }
  }
}
</style>
