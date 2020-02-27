<template>
  <scroll :data="sugest" ref="search" class="search_scroll">
    <div class="search_list">
      <div class="search-suggest" v-show="playlist.Suggest&&playlist.Suggest.length">
        <p class="suggest">搜索建议</p>
        <ul>
          <li
            v-for="(item) in playlist.Suggest"
            class="item-wrapper"
            :key="item.id"
            @click="singeritem(item)"
          >
            <img v-lazy="item.picUrl" width="50" height="50" />
            <span>歌手：{{item.name}}</span>
          </li>
        </ul>
      </div>

      <ul class="suggest-list" ref="suggestList">
        <li
          class="suggest-item"
          v-for="(item, index) in list"
          :key="index"
          @click="selectItem(item,index)"
        >
          <div class="icon">
            <i></i>
          </div>
          <div class="name">
            <p class="song">{{item.MusicName}}</p>
            <p class="singer">{{item.SingerName}}</p>
          </div>
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import scroll from "components/scroll/Scroll";
import { SetObject, SetSinger, GetSinger } from "utials/storage";
import Mixins from "utials/mixinStore";
import {
  getSongDetail,
  MusicURL
} from "network";
export default {
   mixins: [Mixins],
  name: "Suggest",
  props: {
    sugest: {
      type: Array,
      default() {
        return [];
      }
    },
    playlist: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      list: [],
      imges: ""
    };
  },
  components: {
    scroll
  },
  mounted() {},
  computed: {},
  methods: {
    //请求数据并开始播放
    async selectItem(item, index) {
     this.selectPlay({ list: this.list,index});
     let musicurl = await MusicURL(item.MusicId);
      this.setMusicUrl(musicurl.data);
      this.$emit('selects',item)
    },
    //派发事件
    singeritem(item) {
      this.$emit("routers", item);
    }
  },
  watch: {
    //监听数据并处理
    sugest(val) {
      let list = []
       val.forEach(async item => {
        let date = await getSongDetail(item.MusicId);
        let {
          al: { id: aiId, name: alName, picUrl }
        } = date.songs[0];

        // 向item添加数据
        item.AlbumId = aiId;
        item.AlbumImage = picUrl;
        item.AlbumName = alName;
        list.push(item)
      });
      this.list = list
      
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.search_scroll {
  width: 100%;
  height: 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  overflow: hidden;
  .search_list {
    .search-suggest {
      .suggest {
        font-size: 0.24rem;
        line-height: 0.36rem;
      }
      .item-wrapper {
        position: relative;
        display: flex;
        padding: 0.2rem 0;
        align-items: center;
        &:after {
          content: "";
          width: 100%;
          height: 1px;
          background: #ccc;
          transform: scaleY(0.5);
          position: absolute;
          bottom: 0;
        }
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 0.1rem;
          padding-right: 0.2rem;
        }
        span {
          font-size: 0.24rem;
        }
      }
    }
    .suggest-list {
      .suggest-item {
        display: flex;
        line-height: 0.6rem;
        padding-top: 0.2rem;
        position: relative;
        &:after {
          content: "";
          width: 100%;
          height: 1px;
          background: #ccc;
          transform: scaleY(0.5);
          position: absolute;
          bottom: 0;
        }
        .icon {
          width: 0.1rem;
          padding-left: 0.1rem;
          @include center();
        }
        .name {
          flex: 1;
          font-size: 0.32rem;
        }
      }
    }
  }
}
</style>