<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import Banner from 'network/Project/Banner'

export default {
  name: 'Home',
  components: {

  },
  mounted(){
    Banner().then(res=>{
      console.log(res);
      
    })
  }
}
</script>
