<template>
    <scroll class="recoments_wrapper" :data="banner" ref="scroll">
      <div class="recoments_wrapper_content">
        <slider :banners="banner"></slider>
        <play-list class='playmargin'></play-list>
      </div>
      <div class="loading_wrapper" v-show="!getPlaylist.length">
        <loading></loading>
      </div>
    </scroll>
</template>

<script>
import { Banner, playlist, hotplaylist, newsmusic } from "network";
import Slider from "base/Slider";
import mixns from "utials/mixinStore";
import playList from "./PlayList";
import scroll from "components/scroll/Scroll";
import loading from "base/loading/loading";
export default {
  mixins: [mixns],
  name: "Recoments.vue",
  data() {
    return {
      banner: []
    };
  },
  components: {
    Slider,
    playList,
    scroll,
    loading
  },
  mounted() {
    /* 获取banner */
    this.getBanner();
    /* 获取歌单数据 */
    this.getplaylist();
    /* 获取新歌速递 */
    // this.getnewmusic(7);
  },
  methods: {
    /* 获取anner数据 0: pc  1: android，2: iphone ， 3: ipad*/
    async getBanner(type = 2) {
      let data = await Banner(type);
      let { code, banners } = data;
      if (code === 200) {
        this.banner = banners;
      }
    },

    /* 获取精品歌单数据 */
    async getplaylist() {
      let data = await hotplaylist();
      let { code, playlists, lasttime } = data;
      if (code === 200) {
        setTimeout(() => {
          this.setPlaylist(playlists);
        }, 2000);
      }
    },

    /* 获取新歌速递 */
    getnewmusic(type) {
      newsmusic(type).then(res => {
        
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
  .recoments_wrapper {
    position: relative;
    height: calc(100% - 2.4rem);
    bottom: 0;
    overflow: hidden;
    .recoments_wrapper_content{
      .playmargin{
        margin-top: .1rem;
      }
    }
    .loading_wrapper {
      position: absolute;
      background: $color-theme;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>