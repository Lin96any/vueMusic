<template>
  <div class="song">
    <ul>
      <li
        v-for="(item,index) in song"
        :key="item.MusicId"
        class="item-wrapper"
        @click="selectmusic(item,index)"
      >
        <p class="cout">{{index+1}}</p>
        <div class="item">
          <div class="imgs">
            <img v-lazy="item.AlbumImage" alt />
          </div>
          <div class="count">
            <h2>{{item.MusicName}}</h2>
            <p>{{getDesc(item)}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Songlist.vue",
  props: {
    song: {
      type: Array,
      default() {
        return [];
      }
    },
    singer: {
      type: String,
      default: ""
    }
  },
  computed: {},
  methods: {
    getDesc(item) {
      return `专辑-${item.AlbumName}`;
    },
    selectmusic(item, index) {
      this.$emit("selectItem", item, index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";
.song {
    padding-bottom: .5rem;
  .item-wrapper {
    display: flex;
    margin-top: 0.2rem;
    .cout {
      width: 0.6rem;
      font-size: 0.32rem;
      text-align: center;
      line-height: 1.6rem;
    }
    .item {
      display: flex;
      .imgs {
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 0.1rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .count {
        width: 4rem;
        font-size: 0.32rem;
        h2 {
          line-height: 2;
        }
        p {
          line-height: 2;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>