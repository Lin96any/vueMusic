<template>
  <div class="headers">
    <div class="headers-icon-left" @click='mylist'>
      <span class="iconfont list">&#xe647;</span>
    </div>
    <div class="headers-text">
        <span class='headers-title'>VMUSICLIN</span>
    </div>
    <div class="headers-icon-right" @click='search'>
        <span class='iconfont search'>&#xe606;</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'head.vue',
    methods:{
      search(){
        console.log('search');
      },
      mylist(){
        console.log('mylist');
      }
    }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.headers {
  width: 100%;
  height: 1.2rem;
  padding: .2rem 0.3rem;
  box-sizing: border-box;
  @include center();
  .headers-icon-left,
  .headers-icon-right {
      width: .7rem;
      height: .7rem;
      @include center();
      span{
          font-size: .48rem;
          color: $color-text-ll;
      }
  }
  .headers-text{
      flex: 1;
      font-size: .4rem;
      text-align: center;
    span{
        color: $color-text-ll;
    }
  }

}
</style>