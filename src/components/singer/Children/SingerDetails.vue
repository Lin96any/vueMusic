<template>
  <div class="singer_detials">
    <div class="header" ref="header">
      <div class="icon" @click="goback">
        <i class="iconfont">&#xe63e;</i>
      </div>
      <div class="headertxt">
        <h1 class="txt">{{headertitle}}</h1>
      </div>
    </div>
    <div class="disponse" ref='listwrapper'>
      <scroll :data="disposeMusicData" class="musicScroll" ref="list">
        <div class="wrappers">
          <div class="img">
            <div class="bgimg" :style="bgimg"></div>
            <div class="playtx">
              <span class="iconfont">&#xe60d;</span>
              <span>随机播放</span>
            </div>
          </div>
          <song-list :song="disposeMusicData" :singer="headertitle" @selectItem="select"></song-list>
        </div>
      </scroll>
    </div>
    <div class="loadding">
      <loadding v-show="!disposeMusicData.length"></loadding>
    </div>
  </div>
</template>

<script>
import Mixins from "utials/mixinStore";
import { SingerMusic } from "utials/utials";
import { SetObject, GetObject } from "utials/storage";
import { singerMusic, singerHotMusic, MusicURL } from "network";
import scroll from "components/scroll/Scroll";
import SongList from "base/Songlist";
import loadding from "base/loading/loading";
export default {
  mixins: [Mixins],
  name: "SingerDetails",
  created() {
    /* 从storage中取出缓存 */
    let { id, name, avatar } = GetObject("singer");
    this.avatars = avatar;
    this.headertitle = name;
    this.singerId = id;
  },
  mounted() {
    this._initmusic(this.singerId);
  },
  data() {
    return {
      musicObj: {},
      /* 歌手id */
      singerId: 0,
      /* 歌手名字 */
      SingerName: "",
      /* 歌手图片 */
      SingerImage: "",
      /* 歌曲原始数据 */
      MusicData: [],
      /* 对歌曲原始数据进行处理 */
      disposeMusicData: [],
      headertitle: "",
      avatars: ""
    };
  },
  components: {
    scroll,
    SongList,
    loadding
  },
  computed: {
    bgimg() {
      return `backgroundImage:url(${this.avatars})`;
    }
  },
  methods: {
    async _initmusic(id) {
      let data = await singerHotMusic(id);
      let { name, avatar } = GetObject("singer");
      (this.SingerName = name), (this.SingerImage = avatar);
      let { code, songs } = data;
      if (code === 200) {
        this.MusicData = songs;
      }
    },
    /* 对歌曲数据进行处理 */
    _Normal_DisposeData(list) {
      let ret = [];
      list.forEach(item => {
        let { name, id, al } = item;
        // id,name,picUrl
        ret.push(
          new SingerMusic(
            id,
            name,
            al.id,
            al.name,
            al.picUrl,
            this.singerId,
            this.SingerName,
            this.SingerImage
          )
        );
      });
      return ret;
    },
    goback() {
      this.$router.go(-1);
    },
    /* 歌曲选择 */
    async select(item, index) {
      this.selectPlay({ list: this.disposeMusicData, index: index });
      let musicurl = await MusicURL(item.MusicId);
      this.setMusicUrl(musicurl.data);
    },
    handle(list) {

      const bottom = list.length > 0 ? "1.2rem" : "";
      this.$refs.listwrapper.style.bottom = bottom;
      this.getbs.refresh();
      
    }
  },
  watch: {
    MusicData(node) {
      this.disposeMusicData = this._Normal_DisposeData(node);
    },
    getplaylists(newval) {
      this.handle(newval);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";
.singer_detials {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 100;
  background: $color-background;
  .header {
    position: fixed;
    width: 100%;
    display: flex;
    height: 0.88rem;
    background: $color-theme;
    z-index: 999;
    .icon {
      width: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 0.48rem;
        line-height: 0.42rem;
        color: $color-text-ll;
      }
    }
    .headertxt {
      flex: 1;
      display: flex;
      align-items: center;
      .txt {
        margin-left: 30%;
        font-size: 0.32rem;
        line-height: 0.42rem;
        color: $color-text-ll;
      }
    }
  }
  .disponse {
    position: absolute;
    top: 0.88rem;
    bottom: 0;
    width: 100%;
    .musicScroll {
      height: 100%;
      background: $color-background;
      .wrappers {
        .img {
          position: relative;
          width: 100%;
          height: 6rem;
          margin: auto;
          .bgimg {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .playtx {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 2.8rem;
            height: 0.8rem;
            position: absolute;
            bottom: 0.2rem;
            left: 50%;
            font-size: 0.32rem;
            transform: translateX(-50%);
            color: rgb(230, 158, 66);
            border: 1px solid burlywood;
            border-radius: 0.1rem;
            span {
              margin-right: 0.2rem;
              line-height: 0.48rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>