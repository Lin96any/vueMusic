<template>
  <div class="home">
    <headers></headers>
    <tab :tablist="tabList"></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { Banner } from "network";
import Headers from "components/head/head";
import tab from "./homeChild/Tab";
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      tabList: [
        {
          title: "推荐",
          path: "/home/recoments"
        },
        {
          title: "排行",
          path: "/home/rank"
        },
        {
          title: "歌手",
          path: "/home/singer"
        }
      ]
    };
  },
  components: {
    Headers,
    tab
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
