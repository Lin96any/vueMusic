<template>
  <div class="tab">
    <div class="tab-wrapper">
      <div
        class="tab-item"
        v-for="(item,index) in tablist"
        :key="index"
        @click="routerview(item.path)"
      >
        <span :class="{'action':$route.path ===item.path}">{{item.title}}</span>
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
  created() {},
  data() {
    return {
      currentIndex: 0,
      routerlist: ["/recoments", "/rank", "/singer"]
    };
  },
  methods: {
    routerview(path) {
      SetLocalStorage("currentIndex", path);
      this.$router.push({
        path: path
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
  padding: 0.1rem 0 0.3rem 0;
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
        transition: all 0.2s linear;
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