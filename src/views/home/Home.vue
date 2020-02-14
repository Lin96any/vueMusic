<template>
  <div class="home">
    <headers></headers>
    <tab :tablist=tablist></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {Banner} from "network";
import Headers from 'components/head/head';
import tab from './homeChild/Tab'
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      tablist:['推荐','排行','歌手']
    };
  },
  components: {
    Headers,
    tab
  }

};
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
}
</style>
