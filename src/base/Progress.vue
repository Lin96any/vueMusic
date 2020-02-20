<template>
  <div class="progress-bar" ref="bar" @click="offset">
    <div class="bar">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn"
        ref="btn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
      >
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const BTNWIDTH = 16;
import { prefixStyle } from "utials/dom.js";
let transform = prefixStyle("transform");
export default {
  name: "Progress.vue",
  props: {
    prence: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touche = {};
  },
  methods: {
    offset(e) {
      let offsetX = e.offsetX;
      this._offsetX(offsetX);
      this.progressTouchEnd();
    },
    progressTouchStart(e) {
      let touch = e.changedTouches[0];
      console.log(touch);
      let pageX = touch.pageX;
      this.touche.init = true;
      this.touche.start = pageX;
      this.touche.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touche.init) {
        return;
      }
      let touch = e.changedTouches[0];
      let dix = touch.pageX - this.touche.start;
      let newx = this.touche.left + dix;
      let max = this.$refs.bar.clientWidth - BTNWIDTH;
      let offsetX = Math.min(max, Math.max(0, newx));
      this._offsetX(offsetX);
    },
    progressTouchEnd(e) {
      this.touche.init = false;
      let barwidth = this.$refs.bar.clientWidth - BTNWIDTH;
      let percent = this.$refs.progress.clientWidth / barwidth;
      this.$emit("update", percent); 
    },
    _offsetX(offset) {
      this.$refs.progress.style.width = `${offset}px`;
      this.$refs.btn.style[transform] = `translate3d(${offset}px,0,0)`;
    }
  },
  watch: {
    prence(val) {
      if (val >= 0 && !this.touche.init) {
        let barwidth = this.$refs.bar.clientWidth - BTNWIDTH;
        let ofssetleft = val * barwidth;
        this._offsetX(ofssetleft);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/variable";
.progress-bar {
  height: 0.6rem;
  .bar {
    position: relative;
    top: 0.26rem;
    height: 0.08rem;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme-smail;
    }
    .progress-btn {
      position: absolute;
      left: -0.16rem;
      top: -0.26rem;
      width: 0.6rem;
      height: 0.6rem;
      .btn {
        position: relative;
        top: 0.14rem;
        left: 0.14rem;
        box-sizing: border-box;
        width: 0.32rem;
        height: 0.32rem;
        border: 0.1rem solid $color-theme-l;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>