<template>
  <div class="headers">
    <div class="headers-icon-left" @click="mylist">
      <span class="iconfont list">&#xe637;</span>
    </div>
    <div class="headers-text">
      <span class="headers-title">LIN-MUSIC</span>
    </div>
    <div class="headers-icon-right" @click="search">
      <span class="iconfont search">&#xe667;</span>
    </div>

    <transition name="my">
      <mys v-show="isShow" @hidden="hiddens"></mys>
    </transition>

    <transition name="search">
      <search v-show="SearchisShow" @hidden="seachhiddens"></search>
    </transition>
  </div>
</template>

<script>
import Mys from "components/my/My";
import Search from "components/search/Search";
export default {
  name: "head.vue",
  data() {
    return {
      isShow: false,
      SearchisShow:false
    };
  },
  methods: {
    search() {
     this.SearchisShow = true;
    },
    mylist() {
      this.isShow = true;
    },
    hiddens() {
      this.isShow = false;
    },
    seachhiddens(){
        this.SearchisShow = false
    }
  },
  components: {
    Mys,
    Search
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.my-enter,
.my-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.search-enter,
.search-leave-to {
  transform: translate3d(100%, 0, 0);
}

.my-enter-active,
.my-leave-active,
.search-enter-active,
.search-leave-active {
  transition: all 0.3s linear;
}

.headers {
  width: 100%;
  height: 1.2rem;
  padding: 0.2rem 0.3rem;
  box-sizing: border-box;
  @include center();
  .headers-icon-left,
  .headers-icon-right {
    width: 0.7rem;
    height: 0.7rem;
    @include center();
    span {
      font-size: 0.48rem;
      color: $color-text-ll;
    }
  }
  .headers-text {
    flex: 1;
    font-size: 0.4rem;
    text-align: center;
    span {
      color: $color-text-ll;
    }
  }
}
</style>