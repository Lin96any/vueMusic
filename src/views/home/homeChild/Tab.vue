<template>
  <div class="tab">
    <div class="tab-wrapper">
      <div class="tab-item" v-for="(item,index) in tablist" :key="item" @click="routerview(index)">
        <span :class="{'action':currentIndex==index}">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { SetLocalStorage, GetLocalstorage } from "utials/storage";
export default {
  name: "Tab.vue",
  props: {
    tablist: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    let current = GetLocalstorage("currentIndex");
    if (!current) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = current;
    }
  },
  data() {
    return {
      currentIndex: 0,
      routerlist: ["/recoments", "/rank", "/singer"]
    };
  },
  methods: {
    routerview(index) {
      this.currentIndex = index;
      SetLocalStorage("currentIndex", index);
      this.$router.push({
        path: "/home" + this.routerlist[index]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.tab {
  height: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: .1rem 0 .3rem 0;
  .tab-wrapper {
    @include center();
    .tab-item {
      flex: 1;
      @include center();
      span {
        font-size: 0.32rem;
        line-height: 0.48rem;
        color: $color-text-ll;
        padding: 0.1rem 0.2rem;
        border-bottom: 0;
        transition: all .2s linear;
        &.action {
          border-bottom: 0.04rem solid $color-text-ll;
          color: $color-text-l;
          font-size: 0.36rem;
        }
      }
    }
  }
}
</style>