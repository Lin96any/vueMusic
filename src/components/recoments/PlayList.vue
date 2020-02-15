<template>
  <div class="play_list_wrapper">
    <!-- 推荐歌单 -->
    <div class="hotplaylist">
      <div class="play_list_title">
        <span class="play_list-text">推荐歌单</span>
      </div>
      <!-- 根据歌单数据循环生成 -->
      <div class="play_list_content">
        <div class="play_list_container" v-for="(item,index) in getPlaylist" :key="item.id">
          <div class="play_list_container_img">
            <img v-lazy="item.coverImgUrl" />
          </div>
          <p class="play_list_container_txt">{{item.name}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import mixns from "utials/mixinStore";
import { debounce } from "utials/utials";

export default {
  mixins: [mixns],
  name: "PlayList.vue",
  data() {
    return {
      imgIndex: 0
    };
  },
  created() {},
  mounted() {},
  methods: {
    imgload() {
      this.$emit('loadings')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.play_list_wrapper {
  width: 100%;
  // padding: 0 0.1rem 2.2rem 0.2rem;
  height: 100%;
  padding: 0 0.1rem;
  box-sizing: border-box;
  background-color: $color-text-l;
  .hotplaylist {
    height: 100%;
    .play_list_title {
      line-height: 0.8rem;
      font-size: 0.32rem;
    }
    .play_list_content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .play_list_container {
        width: 2.2rem;
        height: 3rem;
        margin: .1rem;
        .play_list_container_img {
          width: 100%;
          height: 2.2rem;
          border-radius: 0.2rem;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .play_list_container_txt {
          font-size: 0.24rem;
          line-height: 0.48rem;
          margin-top: 0.1rem;
          @include no-wrap();
        }
      }
    }
  }
}
</style>