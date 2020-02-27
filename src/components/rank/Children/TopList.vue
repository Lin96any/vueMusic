<template>
  <scroll class="top-wrapper" :data="list">
    <!-- :data="list" -->
    <div class="top-container" v-show="list&&list.length">
      <div class="tracks">
        <h1 class="title">官方榜 :</h1>
        <ul>
          <li v-for="(item) in list" :key="item.id" class="tracks_item" @click="selecttop(item)">
            <div class="tracks_img">
              <img :src="item.coverImgUrl" alt />
              <div class="update_text">{{item.updateFrequency}}</div>
            </div>
            <div class="tracks_text">
              <ul>
                <li v-for="(item,index) in item.tracker" :key="item.first" class="tracks_text_item">
                  <span class="text">{{index+1}}. {{item.name}} - {{item.ar[0].name}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <loading v-show="!list" class="loading"></loading>
  </scroll>
</template>

<script>
import mixns from "utials/mixinStore";
import Scroll from "components/scroll/Scroll";
import { SetToplist, GeToplist } from "utials/storage";
import loading from "base/loading/loading";
export default {
  mixins: [mixns],
  name: "TopList",
  components: {
    Scroll,
    loading
  },
  data() {
    return {
      list: null
    };
  },
  mounted() {
    this._initDate();
  },
  methods: {
    _initDate() {
      let Topdata = GeToplist("TopList");
      if (Topdata) {
        this.list = Topdata;
          this._initToplist();
      } else {
        let timer = setInterval(() => {
          let data = this.getsongdetials;
          if(data&&data.length){
            this.list = data
            this._initToplist();
            clearInterval(timer)
          }
        }, 2000);
      }
    },
    /* 数据处理 */
    _initToplist() {
      if (this.list) {
        /* 为数据对象添加属性 */
        this.list.forEach(item => {
          item.tracker = item.tracks.slice(0, 3);
        });
      }
    },
    /* sort */
    _initsort(list) {
      // name, id, updateFrequency, tracks, coverImgUrl
      let TopSorts = {
        tracks: [],
        notracks: []
      };

      // list.forEach(item => {
      //   if (item.tracks && item.tracks.length > 0) {
      //     TopSorts.tracks.push(
      //       new TopSort(
      //         item.name,
      //         item.id,
      //         item.updateFrequency,
      //         item.tracks,
      //         item.coverImgUrl
      //       )
      //     );
      //   } else {
      //     TopSorts.notracks.push(
      //       new TopSort(
      //         item.name,
      //         item.id,
      //         item.updateFrequency,
      //         item.tracks,
      //         item.coverImgUrl
      //       )
      //     );
      //   }
      // });
      console.log(list);

      console.log(TopSorts);
      this.TopList = TopSorts;
    },
    /* 歌单选取 */
    selecttop(item) {
      this.$emit("selectTop", item);
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";
@import "assets/scss/mixin";
.top-wrapper {
  height: 100%;
  overflow: hidden;
  .top-container {
    padding: 0.2rem;
    box-sizing: border-box;
    .tracks {
      .title {
        font-size: 0.32rem;
        line-height: 0.8rem;
      }
      .tracks_item {
        display: flex;
        height: 2rem;
        @include center();
        padding-bottom: 0.2rem;
        .tracks_img {
          width: 2rem;
          height: 100%;
          border-radius: 0.1rem;
          overflow: hidden;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .update_text {
            position: absolute;
            bottom: 0;
            z-index: 999;
            width: 100%;
            line-height: 0.5rem;
            color: white;
            font-size: 0.24rem;
            text-indent: 0.1rem;
          }
        }
        .tracks_text {
          flex: 1;
          padding-left: 0.32rem;
          .tracks_text_item {
            padding-bottom: 0.1rem;
            line-height: 0.5rem;
            .text {
              display: block;
              width: 3.8rem;
              @include no-wrap();
            }
          }
        }
      }
    }
    .nominate {
      .title {
        font-size: 0.32rem;
        line-height: 0.8rem;
      }
      .nominate_img-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .nominate_img {
          width: 2.2rem;
          height: 2.6rem;
          overflow: hidden;
          padding: 0.2rem 0;
          position: relative;
          img {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 0.1rem;
          }
          .txt {
            font-size: 0.24rem;
            line-height: 0.6rem;
            text-align: center;
          }
          .update_text {
            position: absolute;
            bottom: 0.6rem;
            z-index: 999;
            width: 100%;
            line-height: 0.5rem;
            color: white;
            font-size: 0.24rem;
            text-indent: 0.1rem;
          }
        }
      }
    }
  }
  .loading {
    position: fixed;
    top: 2.4rem;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: white;
  }
}
</style>