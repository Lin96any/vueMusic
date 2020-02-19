<template>
  <div class="palyer" v-show="getplaylists.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="getfullScreen">
        <div class="bgimg">
          <img :src="getcurrentSong.AlbumImage" width="100%" height="100%" alt />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="iconfont fa-angle-down icon-icon-test13"></i>
          </div>
          <h1 class="title">{{getcurrentSong.MusicName}}</h1>
          <h2 class="subtitle">{{`${getcurrentSong.SingerName} - ${getcurrentSong.AlbumName}`}}</h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd" :class="imgrote">
                <img :src="getcurrentSong.AlbumImage" class="image" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="iconfont mode">&#xe60b;</i>
            </div>
            <div class="icon i-left" @click.stop.prevent="preventMusic">
              <i class="iconfont icon-prev">&#xe62c;</i>
            </div>
            <div class="icon i-center" @click="toggleplay">
              <i class="iconfont" :class="toggleicon"></i>
            </div>
            <div class="icon i-right" @click="nextMusic">
              <i class="iconfont icon-test">&#xe632;</i>
            </div>
            <div class="icon i-right">
              <i class="iconfont">&#xe60c;</i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player" v-show="!getfullScreen" @click="open">
        <div class="icon">
          <img :src="getcurrentSong.AlbumImage" width="40" height="40" :class="imgrote" />
        </div>
        <div class="text">
          <h2 class="name">{{getcurrentSong.MusicName}}</h2>
          <div class="desc">{{`${getcurrentSong.SingerName} - ${getcurrentSong.AlbumName}`}}</div>
        </div>
        <div class="control" @click.stop.prevent="toggleplay">
          <i class="iconfont" :class="toggleicon"></i>
        </div>
        <div class="control">
          <i class="iconfont icon-caidan1">&#xe647;</i>
        </div>
      </div>
    </transition>
    <audio :src="MusicURL" ref="audios" @canplay="canplay" @error.stop.prevent="playerror"></audio>
  </div>
</template>

<script>
import Mixins from "utials/mixinStore";
import { MusicURL } from "network";
export default {
  mixins: [Mixins],
  name: "PlayYer.vue",
  data() {
    return {
      MusicURL: "",
      playlock: false
    };
  },
  computed: {
    /* 图标切换 */
    toggleicon() {
      let IconState = this.getplaying;
      return IconState ? "icon-icon-test1" : "icon-icon-test2";
    },
    /* 图片旋转暂停 */
    imgrote() {
      let IconState = this.getplaying;
      return IconState ? "play" : "pause";
    }
  },
  created() {},
  mounted() {},
  methods: {
    back() {
      this.setfullScreen(false);
    },
    open() {
      this.setfullScreen(true);
    },
    toggleplay() {
      this.setplaying(!this.getplaying);
      let playing = this.getplaying;
      let el = this.$refs.audios;
      playing ? el.play() : el.pause();
    },
    /* 下一曲 */
  async nextMusic() {
        let indexs = this.getcurrentIndex;
        indexs++;
        this.setcurrentIndex(indexs);
        let item = this.getplaylists[indexs];
        let musicurl = await MusicURL(item.MusicId);
        this.setMusicUrl(musicurl.data);
        this.playlock = false;
    },
    /* 上一曲 */
    async preventMusic() {
      if (!this.playlock) {
        return;
      }
      let indexs = this.getcurrentIndex;
      if (indexs > 0) {
        indexs--;
      }
      this.setcurrentIndex(indexs);
      let item = this.getplaylists[indexs];
      let musicurl = await MusicURL(item.MusicId);
      this.setMusicUrl(musicurl.data);
      this.playlock = false;
    },
    canplay() {
      this.playlock = true;
    },
    playerror(err) {
      console.log(1);

      this.playlock = true;
    }
  },
  watch: {
    getmusicUrl(data) {
      this.MusicURL = data[0].url;
      this.$nextTick(() => {
        this.$refs.audios.play();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.normal-enter-active,
.normal-leave-active {
  transition: all 0.4s;
  .top,
  .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}
.normal-enter,
.normal-leave-to {
  opacity: 0;
}

.palyer {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: rgb(77, 53, 53);
    .bgimg {
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(0.6rem);
    }
    .top {
      position: relative;
      margin-bottom: 0.5rem;
      z-index: 50;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .fa-angle-down {
          display: block;
          padding: 0.4rem 0.2rem;
          font-size: 0.64rem;
          color: $color-theme-l;
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        padding-top: 10px;
        line-height: 20px;
        text-align: center;
        font-size: $font-size-large;
        font-weight: bold;
        color: $color-text-l;
      }
      .subtitle {
        width: 70%;
        margin: 0 auto;
        line-height: 20px;
        text-align: center;

        font-size: $font-size-small-x;
        color: $color-text-l;
      }
    }
    .middle {
      display: flex;
      align-items: center;
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        &.middleL-enter-active,
        &.middleL-leave-active {
          transition: all 0.3s;
        }
        &.middleL-enter,
        &.middleL-leave-to {
          opacity: 0;
        }
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 15px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
      .middle-r {
        display: inline-block;
        position: absolute;
        top: 0;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        &.middleR-enter-active,
        &.middleR-leave-active {
          transition: all 0.2s;
        }
        &.middleR-enter,
        &.middleR-leave-to {
          opacity: 0;
        }
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 40px;
            color: $color-text-ggg;
            font-size: $font-size-medium;
            &.current {
              color: #fff;
            }
          }
          .no-lyric {
            line-height: 40px;
            margin-top: 60%;
            color: $color-text-ggg;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 1rem;
      width: 100%;
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 0.2rem 0;
        .time {
          color: $color-text-l;
          font-size: $font-size-small;
          flex: 0 0 0.6rempx;
          line-height: 0.6rem;
          width: 0.6rem;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
            color: $color-text-gg;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        .icon {
          justify-content: center;
          flex: 1;
          color: $color-theme-l;
          &.disable {
            color: $color-theme;
          }
          i {
            font-size: 0.6rem;
          }
          &.mode {
            font-size: 0.5rem;
          }
          &.i-left {
            text-align: right;
          }
          &.i-center {
            padding: 0 0.4rem;
            text-align: center;
            i {
              font-size: 0.8rem;
            }
          }
          &.i-right {
            text-align: left;
          }
          .icon-like {
            color: $color-sub-theme;
          }
        }
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 1.2rem;
    background: rgba(255, 255, 255, 0.85);
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        line-height: 14px;
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc {
        font-size: $font-size-small;
        color: $color-text;
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist,
      .iconfont {
        font-size: 30px;
        color: $color-theme-d;
      }
      .iconfont {
        position: relative;
        left: -5px;
        top: -3px;
      }
      .fa-play {
        color: $color-theme-d;
        font-size: 14px;
        position: absolute;
        left: 12px;
        top: 8.5px;
      }
      .fa-stop {
        color: $color-theme-d;
        font-size: 12px;
        position: absolute;
        left: 11px;
        top: 10px;
      }
    }
  }
}
</style>