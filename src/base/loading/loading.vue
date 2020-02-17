<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/scss/variable.scss";

.loading {
  width: 100%;
  height: .8rem;
  text-align: center;
  img {
    margin-top: .2rem;
  }
  p{
    font-size: .32rem;
  }
}
</style>
