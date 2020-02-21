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
        <div
          class="middle"
          @touchstart.stop="togglestart"
          @touchmove.stop="togglemove"
          @touchend.stop="toggleend"
        >
          <div class="middle-l" ref="cds">
            <div class="cd-wrapper">
              <div class="cd" :class="imgrote">
                <img :src="getcurrentSong.AlbumImage" class="image" />
              </div>
            </div>
            <div class="play-lyric-wrapper">
              <div class="play-lyric">{{playric}}</div>
            </div>
          </div>
          <scroll class="middle-r" ref="lyrci" :data="lyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  v-for="(item,index) in lyric.lines"
                  :key="index"
                  :class="{current:index === currentLyIndex}"
                >{{item.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="pointer-wrapper">
            <span class="pointer" :class="{active:porwer==='music'}"></span>
            <span class="pointer" :class="{active:porwer==='lyric'}"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{currentTimer}}</span>
            <div class="progress-bar-wrapper">
              <progres :prence="prence" @update="updatetimer"></progres>
            </div>
            <span class="time time-r">{{durationTimer}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click.stop.prevent="changemode">
              <i class="iconfont" :class="iconsecon"></i>
            </div>
            <div class="icon i-left" @click.stop.prevent="preventMusic">
              <i class="iconfont icon-prev">&#xe62c;</i>
            </div>
            <div class="icon i-center" @click.stop.prevent="toggleplay">
              <i class="iconfont" :class="toggleicon"></i>
            </div>
            <div class="icon i-right" @click.stop.prevent="nextMusic">
              <i class="iconfont icon-test">&#xe632;</i>
            </div>
            <div class="icon i-right" @click.stop.prevent="likeMusic">
              <i class="iconfont" :class="musiclikes"></i>
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
    <audio
      :src="MusicURL"
      ref="audios"
      @canplay="canplay"
      @error.stop.prevent="playerror"
      @timeupdate.stop.prevent="timeupdate"
      @ended="musicend"
    ></audio>
  </div>
</template>

<script>
import Mixins from "utials/mixinStore";
import { playMode, shuffle } from "utials/utials";
import { MusicURL, Lyric } from "network";
import progres from "base/Progress";
import { SetlikeMusic, GetlikeMusic } from "utials/storage";
import Scroll from "components/scroll/Scroll";
import { prefixStyle } from "utials/dom";

/* 引入lyric包 */
import lyricc from "lyric-parser";

let transform = prefixStyle("transform");
let transitionDuration = prefixStyle("transitionDuration");
const timer = 300;

let innerWidth = document.documentElement.clientWidth;

export default {
  mixins: [Mixins],
  name: "PlayYer.vue",
  data() {
    return {
      MusicURL: "",
      playlock: false,
      currentTimer: "",
      durationTimer: "",
      currenttimer: 0,
      durationtimer: 0,
      musiclike: false,
      mode:'',
      currentLyric: true,
      lyric: {},
      currentLyIndex: 0,
      porwer: "music",
      playric: ""
    };
  },
  computed: {
    /* 歌曲收藏图标切换 */
    musiclikes() {
      return this.musiclike ? "icon-icon-12" : "icon-xiai";
    },
    /* 图标切换 */
    toggleicon() {
      let IconState = this.getplaying;
      return IconState ? "icon-icon-test1" : "icon-icon-test2";
    },
    /* 图片旋转暂停 */
    imgrote() {
      let IconState = this.getplaying;
      return IconState ? "play" : "pause";
    },
    prence() {
      return this.currenttimer / this.durationtimer;
    },
    /* 模式 */
    iconsecon() {
      return this.getmode === playMode.sequence
        ? "icon-icon-test8"
        : this.getmode === playMode.loop
        ? "icon-danquxunhuan" 
        : "icon-icon-test9";
    }
  },
  components: {
    progres,
    Scroll
  },
  created() {
    this.touch = {};
  },
  mounted() {},
  methods: {
    /* middle-Touch事件 */
    togglestart(e) {
      /* 记录初始位置 */
      this.touch.init = false;
      this.touch.startX = e.changedTouches[0].pageX;
    },
    togglemove(e) {
      this.touch.init = true;
      let moveX = e.changedTouches[0].pageX;
      /* 判断当前显示状态 */
      this.touch.refrence = this.porwer === "music" ? 0 : -innerWidth;
      let disX = Math.floor(moveX - this.touch.startX) + this.touch.refrence;
      /* 范围限制 */
      let offsetWidth = Math.min(0, Math.max(-innerWidth, disX));
      /* 计算比例 */
      this.touch.refren = Math.abs(offsetWidth / innerWidth);
      /* opacity */
      this.touch.opacity = 1 - this.touch.refren;
      this.$refs.lyrci.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.cds.style.opacity = `${this.touch.opacity}`;
    },
    toggleend(e) {
      if (!this.touch.init) {
        return;
      }
      let offsetWidth = null;

      if (this.porwer === "music") {
        if (this.touch.refren > 0.2) {
          offsetWidth = -innerWidth;
          this.porwer = "lyric";
          this.$refs.cds.style.opacity = `0`;
        } else {
          offsetWidth = 0;
          this.$refs.cds.style.opacity = `1`;
        }
      } else {
        if (this.touch.refren < 0.8) {
          offsetWidth = 0;
          this.porwer = "music";
          this.$refs.cds.style.opacity = `1`;
        } else {
          offsetWidth = -innerWidth;
          this.$refs.cds.style.opacity = `0`;
        }
      }

      this.$refs.lyrci.$el.style[transitionDuration] = `${timer}`;

      this.$refs.lyrci.$el.style[
        transform
      ] = `translate3d(${offsetWidth}px,0,0)`;
    },
    /* 歌曲收藏点击切换 */
    likeMusic() {
      this.musiclike = !this.musiclike;

      if (this.musiclike) {
        let like = this.getcurrentSong;
        let getlikemusic = GetlikeMusic("music");

        if (!getlikemusic) {
          return SetlikeMusic("music", like);
        }
        let item = getlikemusic.find(item => {
          return item.MusicId === like.MusicId;
        });
        item ? "" : SetlikeMusic("music", like);
      }
    },
    /* 模式切换 */
    changemode() {
      let mode = (this.getmode + 1) % 3;
      this.setmode(mode);
      this.mode = mode;
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.getsequenceList);
      } else {
        list = this.getsequenceList;
      }
      this.setplaylists(list);
      this._resetIndex(list);
    },
    _resetIndex(list) {
      /* 找出当前所播放歌曲在当前列表的索引 */
      let index = list.findIndex(item => {
        return item.MusicId === this.getcurrentSong.MusicId;
      });

      this.setcurrentIndex(index);
    },
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
      this.MusicPlaying = this.getplaying;
      if (!this.getplaying) {
        this.lyric.togglePlay();
      }
    },
    /* 下一曲 */
    nextMusic() {
      if (this.getplaylists.length === 1) {
        this.loop();
        return;
      } else {
        let indexs = this.getcurrentIndex;
        indexs++;
        if (indexs === this.getplaylists.length) {
          indexs = 0;
        }
        this._request(indexs);
        if (!this.getplaying) {
          this.togglePlaying();
        }
      }
    },
    /* 上一曲 */
    preventMusic() {
      if (!this.playlock) {
        return;
      }
      let indexs = this.getcurrentIndex;
      if (indexs > 0) {
        indexs--;
      }
      this._request(indexs);
    },
    /* 歌曲请求 */
    async _request(index) {
      this.setcurrentIndex(index);
      this.musiclike = false;
      let item = this.getplaylists[index];
      let musicurl = await MusicURL(item.MusicId);
      this.setMusicUrl(musicurl.data);
      this.playlock = false;
      this.setplaying(true);
    },
    canplay() {
      this.playlock = true;
    },
    playerror(err) {
      this.playlock = true;
    },
    timeupdate(e) {
      /* 当前播放时间 */
      let timer = e.target.currentTime;
      this.currenttimer = timer;
      /* 播放总时间 */
      let durationtimer = e.target.duration;
      this.durationtimer = durationtimer;
      /* 对当前播放时间进行处理 */
      let minue = Math.floor(timer / 60);
      let secont = Math.ceil(timer % 60);
      secont = secont > 9 ? secont : "0" + secont;
      this.currentTimer = `${minue}:${secont}`;

      /* 对总时间进行处理 */
      if (durationtimer) {
        let dminue = Math.floor(durationtimer / 60);
        let dsecont = Math.ceil(durationtimer % 60);
        this.durationTimer = `${dminue}:${dsecont}`;
      }
    },
    /* 播放时间改变 */
    updatetimer(update) {
      let currentTime = update * this.durationtimer;
      this.$refs.audios.currentTime = currentTime;
      if (!this.getplaying) {
        this.toggleplay();
      }
      if (this.lyric) {
        this.lyric.seek(currentTime * 1000);
      }
    },
    /* 歌词处理 */
    lyrciManage(str) {
      let lyc = new lyricc(str, this.handleLyc);
      this.lyric = lyc;
      if (this.getplaying) {
        this.lyric.play();
      }
    },
    /* 歌词高亮 */
    handleLyc({ lineNum, txt }) {
      this.currentLyIndex = lineNum;
      let list = this.$refs.lyricLine;
      if (lineNum > 5) {
        this.$refs.lyrci.scrollElement(list[lineNum - 5], 1000);
      } else {
        this.$refs.lyrci.scrollTo(0, 0, 0, 1000);
      }
      this.playric = txt;
    },
    /* 播放结束 */
    musicend() {
      if (this.mode === playMode.loop) {
        
        this.loop();
      } else {
        this.nextMusic();
      }
    },
    /* 循环播放 */
    loop() {
      this.$refs.audios.currentTime = 0;
      this.$refs.audios.play();
      this.setplaying(true);
      if (this.lyric) {
        this.lyric.seek(0);
      }
    }
  },
  watch: {
    getmusicUrl(data) {
      this.MusicURL = data[0].url;
      this.$nextTick(() => {
        this.$refs.audios.play();
      });
    },
    getplaylists(val, old) {
      if (val.MusicId === old.MusicId) {
        return;
      }
    },
    async getcurrentSong(val) {
      /* 从storage中获取喜爱歌曲，判断是否有当前播放的歌曲 */
      let getlikemusic = GetlikeMusic("music");
      let item = getlikemusic.find(item => {
        return item.MusicId === val.MusicId;
      });
      /* 如果有则改变图标 */
      if (item) {
        this.musiclike = true;
      }

      if (this.lyric) {
        this.lyric.stop && this.lyric.stop();
      }
      /* 获取歌词 */
      // MusicId
      let lyricdata = await Lyric(val.MusicId);
      /* 歌词处理 */
      let lyrics = lyricdata.lrc.lyric;
      this.lyrciManage(lyrics);
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
        .play-lyric-wrapper {
          position: absolute;
          bottom: -1.3rem;
          height: 0.6rem;
          width: 4rem;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
          // background: orange;
          display: flex;
          // justify-content: center;
          .play-lyric {
            width: 100%;
            line-height: 0.6rem;
            font-size: 0.32rem;
            color: $color-text-lm;
            text-align: center;
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
            line-height: 0.8rem;
            color: $color-text-ggg;
            font-size: $font-size-medium;
            &.current {
              color: #fff;
            }
          }
          .no-lyric {
            line-height: 0.8rem;
            margin-top: 60%;
            color: $color-text-ggg;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      .pointer-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        .pointer {
          display: inline-block;
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.5s linear;
          margin-right: 0.1rem;
          &.active {
            width: 0.5rem;
            height: 0.2rem;
            border-radius: 0.16rem;
          }
        }
      }
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