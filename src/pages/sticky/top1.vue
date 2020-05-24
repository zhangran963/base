<template>
  <div class="c-sticky-top">
    sticky/top
    方案1: position: sticky;

    <ul class="items">
      <li v-for="(item, index) in items" :key="index" class="item">
        <p class="capital">
          {{ item.capital }}
        </p>
        <p v-for="(subItem, i) in item.citys" :key="i" class="city">
          {{ subItem }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      items: []
    };
  },
  mounted() {
    window.sticky = this;

    this.items = [
      {
        capital: "石家庄",
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
        citys: ["青岛", "潍坊", "东营", "烟台"]
      },
      {
        capital: "广州",
        citys: ["中山", "深圳", "东莞", "清远", "珠海", "佛山"]
      }
    ];
  }
};
</script>

<style lang="scss" scoped>

// 方案1: position: sticky;
.c-sticky-top {
  color: lightsalmon;
  text-align: left;
  
  .items{

    .capital{
      font-weight: bolder;
      background-color: white;
      padding: 2em 0 1em;

      position: sticky;
      top: 0;
    }
    .city{
      padding: 1.5em;
    }
  }
}
</style>
