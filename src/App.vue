<template>
  <div id="app">
    <router-view/>
    <play class="play"></play>
  </div>
</template>
<script>
import play from 'components/player/PlayYer'
export default {
  name:'App.vue',
  components:{
    play
  }
}
</script>
<style lang="scss">
@import 'assets/scss/variable';
#app {
  width: 100%;
  height: 100%;
  background: $color-theme;
}
</style>
