<template>
  <div class='singer'>歌手页</div>
</template>

<script>
import { hotSinger } from "network";

/* 加载pinyin库 */
import pinyin from 'pinyin';

export default {
  name: "Singer.vue",
  data() {
    return {
      artists: []
    };
  },
  mounted() {
    this.gethotsinger();
  },
  methods: {
    async gethotsinger(offset = 0, limit = 100) {
      let hotsingerdata = await hotSinger(offset, limit);
      console.log(hotsingerdata);
      let { code, artists } = hotsingerdata;
      if (code === 200) {
        this.artists.push(...artists);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
 .singer {
    position: fixed;
    top: 2.4rem;
    bottom: 0;
    width: 100%;
 }
</style>