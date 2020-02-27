<template>
  <div class="my">
    <div class="my-wrapper">
      <div class="myheard">
        <div class="headleft" @click="isShow">
          <span class="iconfont">&#xe671;</span>
        </div>
        <div class="headright">
          <h2 class="title">My</h2>
        </div>
      </div>
      <div class="mytitle">
        <div class="title-left" @click="select(0)">
          <h2 class="heard_music" :class="{active:current===0}">我听过的歌曲</h2>
        </div>
        <div class="title-right" @click="select(1)">
          <h2 class="collect_music" :class="{active:current===1}">我收藏的歌曲</h2>
        </div>
      </div>
    </div>
    <scroll :data="heardmuics" class="scroll" v-show="current===0">
      <div class="heardmusic">
        <div class="errs" v-if="!heardmuics">
          <p>对不起，没有数据</p>
        </div>
        <div class="data" v-else>
          <ul>
            <li
              v-for="(item,index) in heardmuics"
              :key="index"
              class="item-wrapper"
              @click="selectitem(item,index)"
            >
              <div class="item_index">{{index+1}}</div>
              <div class="item-text">
                <p class="musicname">{{item.MusicName}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <scroll :data="heardmuics" class="collect" v-show="current===1">
      <div class="heardmusic">
        <div class="errs" v-if="!likemusic">
          <p>对不起，没有数据</p>
        </div>
        <div class="data" v-else>
          <ul>
            <li
              v-for="(item,index) in likemusic"
              :key="index"
              class="item-wrapper"
              @click="selectitem(item,index)"
            >
              <div class="item_index">{{index+1}}</div>
              <div class="item-text">
                <p class="musicname">{{item.MusicName}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { GetHeardMusic , GetlikeMusic} from "utials/storage";
import Mixins from "utials/mixinStore";
import scroll from "components/scroll/Scroll";
import { SingerMusic } from "utials/utials";
import { singerMusic, singerHotMusic, MusicURL } from "network";
export default {
  mixins: [Mixins],
  name: "My",
  data() {
    return {
      current: 0,
      heardmuics: null,
      likemusic:null
    };
  },
  components: {
    scroll
  },
  mounted() {
    this.initHeardMuisc();
  },
  methods: {
    isShow() {
      this.$emit("hidden");
      
    },
    initHeardMuisc() {
      let music = GetHeardMusic("music");
      let like = GetlikeMusic("music");
      this.likemusic = like?like:null;
      if (music && music.length) {
        this.heardmuics = music;
      }
    },
    async selectitem(item, index) {
      /* 加入播放队列 */
      this.selectPlay({ list: this.heardmuics, index: index });
      let musicurl = await MusicURL(item.MusicId);
      this.setMusicUrl(musicurl.data);
      this.isShow();
    },
    select(index) {
      this.current = index;
    }
  },
  watch: {
    getheardmusic(val) {
      if (this.heardmuics) {
        this.heardmuics.push(val);
      } else {
        this.heardmuics = [];
        this.heardmuics.push(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.my {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  height: 100%;
  background: white;
  .my-wrapper {
    overflow: hidden;
    .myheard {
      height: 0.8rem;
      background: $color-theme;
      display: flex;
      .headleft {
        width: 1.2rem;
        display: flex;
        @include center();
        span {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 0 0.2rem;
          font-size: 0.42rem;
          color: aliceblue;
        }
      }
      .headright {
        flex: 1;
        .title {
          font-size: 0.48rem;
          font-weight: normal;
          color: aliceblue;
          line-height: 0.8rem;
          padding-left: 2rem;
        }
      }
    }
    .mytitle {
      height: 0.8rem;
      background: $color-theme;
      font-size: 0.32rem;
      display: flex;
      .title-left {
        flex: 1;
        @include center();
        .heard_music {
          display: block;
          box-sizing: border-box;
          color: aliceblue;
          line-height: 0.8rem;
          transition: all 0.1s linear;
          &.active {
            font-size: 0.42rem;
          }
        }
      }
      .title-right {
        flex: 1;
        @include center();
        .collect_music {
          font-weight: normal;
          color: aliceblue;
          line-height: 0.8rem;
          transition: all 0.1s linear;
          &.active {
            font-size: 0.42rem;
          }
        }
      }
    }
  }
  .scroll {
    position: absolute;
    top: 1.6rem;
    bottom: 0;
    overflow: hidden;
    .heardmusic {
      .errs {
        font-size: 0.32rem;
        text-align: center;
        margin-top: 0.5rem;
      }
    }
    .data {
      .item-wrapper {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0.2rem;
        text-align: center;
        .item_index {
          width: 0.6rem;
          height: 100%;
          font-size: 0.32rem;
        }
        .item-text {
          height: 100%;
          font-size: 0.32rem;
          .musicname {
            line-height: 0.5rem;
          }
        }
      }
    }
  }
  .collect {
    position: absolute;
    top: 1.6rem;
    bottom: 0;
    overflow: hidden;
    .heardmusic {
      .errs {
        font-size: 0.32rem;
        text-align: center;
        margin-top: 0.5rem;
      }
    }
    .data {
      .item-wrapper {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0.2rem;
        text-align: center;
        .item_index {
          width: 0.6rem;
          height: 100%;
          font-size: 0.32rem;
        }
        .item-text {
          height: 100%;
          font-size: 0.32rem;
          .musicname {
            line-height: 0.5rem;
          }
        }
      }
    }
  }
}
</style>