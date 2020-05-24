<template>
  <div class="c-sticky-top">
    sticky/top 方案2: position: fixed;

    <ul class="items">
      <li v-for="(item, index) in items" :key="index" class="item">
        <p class="capital" :class="{ fixed: item.isToped }" ref="capital">
          {{ item.capital }}
        </p>
        <p class="position" v-if="item.isToped"></p>
        <p v-for="(subItem, i) in item.citys" :key="i" class="city">
          {{ subItem }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { direction } from "./direction";

export default {
  data: () => {
    return {
      items: [
        {
          capital: "石家庄",
          isToped: false,
          citys: [
            "张家口",
            "承德",
            "秦皇岛",
            "唐山",
            "保定",
            "沧州",
            "廊坊",
            "衡水"
          ]
        },
        {
          capital: "济南",
          isToped: false,
          citys: ["青岛", "潍坊", "东营", "烟台"]
        },
        {
          capital: "广州",
          isToped: false,
          citys: ["中山", "深圳", "东莞", "清远", "珠海", "佛山"]
        }
      ]
    }
  },

  watch: {

  },
  mounted() {
    let that = this;

    window.addEventListener('scroll', function(e){
      let direct = direction() /* 获取滑动方向 */

      let capitals = that.$refs.capital
      that.items.forEach((item, i) => {
        if(direct.isUp){
          /* 向上滑动, 距顶部为0, 即认为置顶 */
          that.items[i].isToped = capitals[i].getBoundingClientRect().top <= 0
        }
        if(direct.isDown){
          /* 向下滑动, 占位元素的位置 > 置顶元素, 即认为脱离置顶 */
          let positionElement = that.nextElement(capitals[i], '.position')
          if(positionElement){
            let capitalY = capitals[i].getBoundingClientRect().y
            let positionY = positionElement.getBoundingClientRect().y
            if(positionY > capitalY){
              that.items[i].isToped = false
            }
          }
        }
      })
    })
  },
  methods: {
    /**
     * 获取当前元素的(指定选择器)下一个元素
     */
    nextElement(curElement,select=''){
      let nextElement = curElement.nextElementSibling
      if(curElement.parentNode.querySelector(select) === nextElement){
        return nextElement
      }else{
        return null
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// 方案2: position: relative;
.c-sticky-top {
  color: lightsalmon;
  text-align: left;

  .items {
    .capital {
      font-weight: bolder;
      background-color: white;
      height: 4em;
      line-height: 4em;

      &.fixed {
        position: fixed;
        top: 0;
      }
    }
    .position {
      height: 4em;
    }
    .city {
      padding: 1.5em;
    }
    p {
      width: 100vw;
      box-sizing: border-box;
    }
  }
}
</style>
