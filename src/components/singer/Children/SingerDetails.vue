<template>
  <div class="singer_detials">
    <div class="header" ref="header">
      <div class="icon">
        <i class="iconfont">&#xe63e;</i>
      </div>
      <div class="headertxt">
        <h1 class="txt">{{headertitle}}</h1>
      </div>
    </div>
    <div class="disponse">
      <scroll :data="disposeMusicData" class="musicScroll">
        <ul>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
          <li>123</li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import Mixins from "utials/mixinStore";
import { SingerMusic } from "utials/utials";
import { SetObject, GetObject } from "utials/storage";
import { singerMusic, singerHotMusic } from "network";
import scroll from "components/scroll/Scroll";
export default {
  mixins: [Mixins],
  name: "SingerDetails",
  computed: {},
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
      headertitle: "歌手热门歌曲"
    };
  },
  created() {
    /* 从storage中取出缓存 */
    let storageMusicObj = GetObject("singer");
    this.singerId = storageMusicObj.id;
  },
  mounted() {
    this._initmusic(this.singerId);
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
        ret.push(new SingerMusic(id, name, al.id, al.name, al.picUrl));
      });
      return ret;
    }
  },
  components: {
    scroll
  },
  watch: {
    MusicData(node) {
      this.disposeMusicData = this._Normal_DisposeData(node);
      console.log(this.disposeMusicData);
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
    top: .88rem;
    bottom: 0;
    .musicScroll {
      background: $color-background;
    }
  }
}
</style>