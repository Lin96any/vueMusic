<template>
  <div calss="recoments">
      <slider :banners='banner'></slider>
  </div>
</template>

<script>
import { Banner } from "network";
import Slider from "base/Slider";
export default {
  name: "Recoments.vue",
  data() {
    return {
      banner: []
    };
  },
  components: {
    Slider
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    /* 获取anner数据 0: pc  1: android，2: iphone ， 3: ipad*/
    async getBanner(type = 2) {
      let data = await Banner(type);
      let { code, banners } = data;
      if (code === 200) {
        this.banner = banners;
        console.log(this.banner);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";

</style>