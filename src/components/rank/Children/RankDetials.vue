<template>
  <div class="rank_list">
    <div class="back" @click="back">
      <i class="iconfont icon-back">&#xe671;</i>
    </div>
    <h1 class="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" class="play" @click="random">
          <i class="icon-bofang" v-show="songlist.length>0"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="scroll-wrapper" ref="scroll">
      <scroll class="list" ref="list" :data="songlist">
        <div class="song-list-wrapper">
          <song-list @selectItem="select" :song="songlist"></song-list>
        </div>
      </scroll>
    </div>
    <div class="loading-container">
      <loadding v-show="!songlist.length"></loadding>
    </div>
  </div>
</template>

<script>
import SongList from "base/Songlist";
import loadding from "base/loading/loading";
import scroll from "components/scroll/Scroll";
import { SingerMusic } from "utials/utials";
import Mixins from "utials/mixinStore";
export default {
  mixins: [Mixins],
  name: "RankDetials",
  props: {
    Topdata: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      songlist: []
    };
  },
  mounted() {},
  methods: {
    //派发事件隐藏
    back() {
      this.$emit("back", false);
    },
    //无序播放
    random() {
      this.randomPlay({
        list: this.songlist
      });
    },
    //播放
    select(item, index) {
      this.selectPlay({ list: this.songlist, index: index });
    },
    //数据处理
    song(val) {
      let list = [];
      let { tracks } = val;
      tracks.forEach(item => {
        //name,id,al.id,al.name,al.picUrl,ar[0].id,ar[0].name
        /* (MusicId = '', MusicName = '', AlbumId = '', 
        AlbumName = '', AlbumImage = '', SingerID = '',
         SingerName = '', singerImg='') */
        let {
          id,
          name,
          al: { id: alId, name: alName, picUrl },
          ar
        } = item;
        let [singer] = ar;
        list.push(
          new SingerMusic(
            id,
            name,
            alId,
            alName,
            picUrl,
            singer.id,
            singer.name
          )
        );
      });
      this.songlist = list;
    },
    //scroll优化
    handle(list) {
      const bottom = list.length > 0 ? "1.2rem" : "";
      this.$refs.scroll.style.bottom = bottom;
      this.getbs.refresh();
    }
  },
  computed: {
    bgStyle() {
      if (this.Topdata && this.Topdata.coverImgUrl) {
        return {
          background: `url(${this.Topdata.coverImgUrl}) no-repeat`
        };
      }
    }
  },
  components: {
    loadding,
    SongList,
    scroll
  },
  watch: {
    Topdata(val) {
      this.song(val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";
@import "assets/scss/mixin";
.rank_list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
    background-size: cover !important;
    background-position: 0 -1.5rem !important;
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
    z-index: 9999;
    .list {
      height: 100%;
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