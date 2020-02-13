<template>
  <div class="home"></div>
</template>

<script>
import {Banner} from "network";

export default {
  name: "Home",
  data() {
    return {
      banner: []
    };
  },
  components: {},
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
      }
    }
    
  }
};
</script>

<style lang="scss" scope>
</style>
