<template>
  <div class="recoments" ref="recoments">
    <scroll class="recoments_wrapper" :data="banner" ref="scroll">
      <div class="recoments_wrapper_content">
        <slider :banners="banner"></slider>
        <play-list class="playmargin" @songitems="items"></play-list>
      </div>
    </scroll>

    <transition name="details">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import {
  Banner,
  playlist,
  hotplaylist,
  newsmusic,
  SongListDetailsRequest
} from "network";
import Slider from "base/Slider";
import mixns from "utials/mixinStore";
import playList from "./PlayList";
import scroll from "components/scroll/Scroll";
import loading from "base/loading/loading";
import { SongList } from "utials/utials";
import { SetRanComents, GetRanComents } from "utials/storage";
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
    items(item) {
      /* 数据处理 */
      let { id, name, coverImgUrl, description } = item;
      
      let songlist = new SongList(id, name, coverImgUrl, description);
      this.setsonglist(songlist);
      /* 路由跳转 */
      this.songrouter();
    },
    songrouter() {
      this.$router.push({
        path: "/home/recoments/songdetails"
      });
    },
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
        this.setPlaylist(playlists);
        SetRanComents('recoments',playlists)
      }
    },

    handle(list) {
      const bottom = list.length > 0 ? "1.2rem" : "";
      this.$refs.recoments.style.bottom = bottom;
      this.getbs.refresh();
    },
    /* 获取新歌速递 */
    getnewmusic(type) {
      newsmusic(type).then(res => {});
    }
  },
  watch: {
    getplaylists(newval) {
      this.handle(newval);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.details-enter,
.details-leave-to {
  transform: translate3d(100%, 0, 0);
}

.details-enter-active,
.details-leave-active {
  transition: all 0.2s linear;
}
.recoments {
  position: absolute;
  top: 2.4rem;
  bottom: 0;
  width: 100%;
  .recoments_wrapper {
    height: 100%;
    overflow: hidden;
    .recoments_wrapper_content {
      .playmargin {
        margin-top: 0.1rem;
      }
    }
  }
}
</style>