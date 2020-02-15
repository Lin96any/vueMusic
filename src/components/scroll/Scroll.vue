<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BsScroll from "better-scroll";
import mixns from "utials/mixinStore";
export default {
  mixins: [mixns],
  name: "Scroll.vue",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BsScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType
      });
      this.setbs(this.scroll);
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  },
  watch:{
      data(){
          setTimeout(()=>{
              this.refresh()
          },20)
      }
  }
};
</script>

<style lang="scss" scoped>
.wrapper{
  height: 100%;
}
</style>