<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="iconfont icon-back">&#xe671;</i>
    </div>
    <h1 class="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songlist.length>0" class="play" @click="random">
          <i class="icon-bofangicon"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="scroll-wrapper" ref="scroll">
      <scroll :data="songlist" class="list" ref="list">
        <div class="song-list-wrapper">
          <song-list :song="songlist" @selectItem="select"></song-list>
        </div>
      </scroll>
    </div>
    <div class="loading-container" v-show="!songlist.length">
      <loadding></loadding>
    </div>
  </div>
</template> 

<script>
import Mixins from "utials/mixinStore";
/* 歌单详情请求 */
import { SongListDetailsRequest } from "network";
import scroll from "components/scroll/Scroll";
import { SingerMusic } from "utials/utials";
import SongList from "base/Songlist";
import loadding from "base/loading/loading";
import { singerMusic, singerHotMusic, MusicURL } from "network";
export default {
  mixins: [Mixins],
  name: "SongListDetails",
  data() {
    return {
      songObj: {},
      songlist: []
    };
  },
  computed: {
    bgStyle() {
      return `backgroundImage:url(${this.songObj.cover})`;
    }
  },
  created() {
    if (!this.getsonglist.id) {
      this.$router.push({
        path: "/home/recoments"
      });
    }
  },
  components: {
    scroll,
    SongList,
    loadding
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    random() {
      this.randomPlay({
        list: this.songlist
      });
    },
    selectItem() {},
    /* 数据处理 */
    dispose(data) {
      //code,playlist.tracks
      let {
        code,
        playlist: { tracks }
      } = data;
      if (code === 200) {
        let songlist = [];
        tracks.forEach(item => {
          let {
            name,
            id,
            al: { name: alName, id: alId, picUrl },
            ar: { arId, arName }
          } = item;
          songlist.push(
            new SingerMusic(id, name, alId, alName, picUrl, arId, arName)
          );
        });
        this.songlist = songlist;
      }
    },
    async select(item, index) {
      /* 加入播放队列 */
      this.selectPlay({ list: this.songlist, index: index });
      let musicurl = await MusicURL(item.MusicId);
      this.setMusicUrl(musicurl.data);
    },
    handle(list) {
      const bottom = list.length > 0 ? "1.2rem" : "";
      this.$refs.scroll.style.bottom = bottom;
      this.getbs.refresh();
    }
  },
  watch: {
    //监听判断且请求数据
    getsonglist: {
      async handler(val) {
        if (!val.id) {
          return;
        }
        this.songObj = val;
        let data = await SongListDetailsRequest(val.id);
        this.dispose(data);
      },
      immediate: true
    },
  }
};
</script>

<style scoped lang="scss" scoped>
@import "assets/scss/variable";
@import "assets/scss/mixin";

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 0.12rem;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 0.2rem;
      font-size: 0.48rem;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap();
    text-align: center;
    line-height: 0.8rem;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .scroll-wrapper {
    position: absolute;
    top: 5.3rem;
    bottom: 0;
    overflow: hidden;
    .list {
      height: 100%;
      width: 100%;
      .song-list-wrapper {
        padding: 0.1rem 0.3rem;
      }
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 70%;
    bottom: 0;
    z-index: 999;
    transform: translateY(-50%);
  }
}
</style>