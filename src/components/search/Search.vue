<template>
  <div class="search">
    <div class="header" ref="header">
      <div class="icon" @click="goback">
        <i class="iconfont">&#xe671;</i>
      </div>
      <div class="headertxt">
        <h1 class="txt">{{headertitle}}</h1>
      </div>
    </div>
    <div class="container">
      <inputs @values="keyvalue" @clear="clears"></inputs>
    </div>
    <div class="suggest" v-show="searchlist&&searchlist.length&&ishow">
      <suggest :sugest="searchlist" :playlist="playlist" @routers="router" 
      @selects="select"></suggest>
    </div>
    <div class="hotserch" v-show="!hotvalue">
      <h2 class="searchtitle">热搜关键词:</h2>
      <ul class="hotsearch_item">
        <li
          v-for="(item) in hotsearch"
          :key="item.score"
          class="item_wrapper"
          @click="hotsearchs(item)"
        >
          <span>{{item.searchWord}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import inputs from "./chilredn/SearchInput";
import { SetObject, SetSinger, GetSinger } from "utials/storage";
import {
  search,
  Searchmatching,
  getSongDetail,
  getSearchSuggest,
  MusicURL
} from "network";
import Suggest from "./chilredn/Suggest";
import { SingerMusic, Singer } from "utials/utials";
import Mixins from "utials/mixinStore";
export default {
  mixins: [Mixins],
  name: "Search.vue",
  data() {
    return {
      headertitle: "搜索页",
      hotsearch: null,
      hotvalue: "",
      searchlist: [],
      playlist: {},
      ishow: true
    };
  },
  async mounted() {
    this._inithot();
  },
  methods: {
    //关闭搜索
    select() {
      this.goback();
    },
    //路由跳转
    router(item) {
      SetObject("singer", item);
      this.$router.push({
        path: "/home/singer/singerdetial"
      });
      this.goback();
    },
    //清楚搜索框
    clears(bolean) {
      this.ishow = bolean;
    },
    //关闭搜索
    goback() {
      this.$emit("hidden");
    },
    //初始化数据
    async _inithot() {
      let searchdata = await search();
      let { code, data } = searchdata;
      if (code === 200) {
        this.hotsearch = data.slice(0, 8);
      }
    },
    /* 请求搜索歌曲数据 */
    async keyvalue(val) {
      let index = 0;
      this.hotvalue = val;
      if (val) {
        let Searchmatchingdata = await Searchmatching(val, index);
        let { code, result } = Searchmatchingdata;
        if (code === 200) {
          let { songs } = result;
          /* 清空 */
          this.searchlist = [];
          songs.forEach(el => {
            let { id, name, artists } = el;
            let { id: arId, name: arName, img1v1Url } = artists[0];
            this.searchlist.push(
              new SingerMusic(id, name, "", "", "", arId, arName, img1v1Url)
            );
          });
          this.SearchSinger(val);
        }
      } else {
        this.playlist = {};
        this.searchlist = [];
        return;
      }
    },
    /* 搜索建议 */
    async SearchSinger(val) {
      let Suggestdata = await getSearchSuggest(val);
      let {
        result: { artists, albums }
      } = Suggestdata;

      if (artists && artists.length) {
        this.playlist = {};
        if (artists.length > 1) {
          this.playlist.Suggest = artists;
        } else if ((artists.length = 1)) {
          this.playlist.Suggest = artists;
          this.playlist.playlist = albums;
        }
      }
    }
  },
  components: {
    inputs,
    Suggest
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.singer-enter,
.singer-leave-to {
  transform: translate3d(-100%);
}

.singer-enter-active,
.singer-leave-active {
  transition: all 0.3s linear;
}

.search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 999;
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
  .container {
    margin-top: 1rem;
  }
  .suggest {
    position: absolute;
    top: 1.9rem;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .hotserch {
    margin-top: 0.2rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    .searchtitle {
      font-size: 0.32rem;
      font-weight: none;
    }
    .hotsearch_item {
      overflow: hidden;
      margin-top: 0.1rem;
      .item_wrapper {
        float: left;
        font-size: 0.32rem;
        margin: 0.1rem;
        overflow: hidden;
        span {
          line-height: 0.6rem;
          padding: 0.1rem;
          border: 1px solid #cccc;
          border-radius: 0.1rem;
        }
      }
    }
  }
}
</style>