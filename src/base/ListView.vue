<template>
  <scroll
    class="listview"
    :data="data"
    ref="Listviews"
    :listenScroll="true"
    :probeType="this.probeTypes"
    @scroll="scrolls"
  >
    <ul>
      <li v-for="group in data" :key="group.title" class="list-group" ref="listgroup">
        <p class="list-group-title">{{group.title}}</p>
        <ul>
          <li
            v-for="item in group.item"
            :key="item.id"
            class="list-group-item"
            @click="selectitem(item)"
          >
            <img v-lazy="item.avatar" alt class="avatar" />
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onshort" @touchmove.stop.prevent="ontouchmove">
      <ul>
        <li
          v-for="(item,index) in shorList"
          :key="item"
          class="item"
          :data-index="index"
          :class="{active:index===ScrollIndex}"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed-tile" v-show="!positive">
      <div class="title">{{fixedtitle}}</div>
    </div>
    <div class="loading" v-show="!this.data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/scroll/Scroll";
import { getindex } from "utials/utials";
import loading from "base/loading/loading";
import Mixins from "utials/mixinStore";
export default {
   mixins: [Mixins],
  name: "ListView.vue",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    probeType: {
      type: Number,
      default: -1
    }
  },
  computed: {
    shorList() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    },
    /* 吸顶显示 */
    fixedtitle() {
      if (this.showHot >= 0) {
        this.ScrollIndex = 0;
        return "热门";
      }
      return this.data[this.ScrollIndex]
        ? this.data[this.ScrollIndex].title
        : "";
    }
  },
  data() {
    return {
      touche: {},
      probeTypes: 3,
      allScroll: [],
      /* 滚动数据 */
      ScrollY: 0,
      /* 下标 */
      ScrollIndex: 0,
      /* 滚动是否为正负 */
      positive: false,
      /* 显示处理 */
      showHot: 0
    };
  },
  mounted() {},
  components: {
    Scroll,
    loading
  },
  methods: {

    /* 点击short滚动到指定区域 */
    onshort(e) {
      let index = getindex(e.target, "index");
      let firstTouch = e.changedTouches[0];
      this.touche.y1 = firstTouch.pageY;
      this.touche.index = index;
      this._scroll(index);
    },
    /* 实现左右联动 */
    ontouchmove(e) {
      let firstTouch = e.changedTouches[0];
      this.touche.y2 = firstTouch.pageY;
      let dataY = (Math.floor(this.touche.y2 - this.touche.y1) / 17) | 0;
      let index = +(this.touche.index + dataY);
      this._scroll(index);
    },
    _scroll(index) {
      this.$refs.Listviews.scrollElement(this.$refs.listgroup[index]);
    },
    scrolls(poy) {
      this.positive = poy.y > 0 ? true : false;
      this.showHot = poy.y;
      this.ScrollY = Math.floor(Math.abs(poy.y));
    },
    /* 初始化高度 */
    _initHeight() {
      /* 循环遍历生成用于联动的高度 */
      let initscroll = 0;
      this.allScroll.push(initscroll);
      this.$refs.listgroup.forEach(item => {
        initscroll += parseInt(item.offsetHeight) + 10;
        this.allScroll.push(initscroll);
      });
    },
    selectitem(item) {
      /* 事件派发出去 */
      this.$emit("selectSinger", item);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._initHeight();
      }, 20);
    },
    ScrollY(ScrollY) {
      for (let i = 0; i < this.allScroll.length; i++) {
        let firstScroll = this.allScroll[i];
        let lastScroll = this.allScroll[i + 1];

        if (!lastScroll || (ScrollY > firstScroll && ScrollY < lastScroll)) {
          return (this.ScrollIndex = i);
        }
        this.ScrollIndex = 0;
      }
    },
 
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";
.listview {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  .list-group {
    .list-group-title {
      height: 0.4rem;
      line-height: 0.4rem;
      padding-left: 0.4rem;
      margin-bottom: 0.2rem;
      font-size: $font-size-small;
      color: #fff;
      background: $color-theme-smail;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 0.1rem 0;
      margin: 0 0.1rem;
      position: relative;
      &:after {
        position: absolute;
        bottom: 0;
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: $color-background;
        transform: scaleY(0.5);
      }
      &:last-child {
        border: none;
        margin-bottom: 0.2rem;
      }
      .avatar {
        width: 1rem;
        height: 1rem;
        border-radius: 0.06rem;
      }
      .name {
        margin-left: 0.4rem;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0.06rem;
    top: 50%;
    transform: translateY(-50%);
    width: 0.8rem;
    border-radius: 0.06rem;
    text-align: center;
    font-family: Helvetica;
    .item {
      padding: 0.06rem;
      line-height: 1;
      color: $color-text-ggg;
      font-size: $font-size-small;
      font-weight: bold;
      &.active {
        color: $color-text;
      }
    }
  }
  .list-fixed-tile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .title {
      height: 0.4rem;
      line-height: 0.4rem;
      padding-left: 0.4rem;
      font-size: $font-size-small;
      color: #fff;
      background: $color-theme;
    }
  }
  .loading {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>