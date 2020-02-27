<template>
  <div class="top_list" ref='rank'>
    <top-lists @selectTop="selct"></top-lists>
    <transition name="rank">
      <detials :Topdata="selectObj" v-show="isShow" @back="backs"></detials>
    </transition>
  </div>
</template>

<script>
import TopLists from "./Children/TopList";
import { TopList } from "network";
import mixns from "utials/mixinStore";
import { SetToplist, GeToplist } from "utials/storage";
import { TopSort, SingerMusic } from "utials/utials";
import Detials from "./Children/RankDetials";
import axios from "axios";

let TopId = [0, 1, 2, 3, 4, 22, 23];
export default {
  mixins: [mixns],
  name: "Rank.vue",
  components: {
    TopLists,
    Detials
  },
  data() {
    return {
      selectObj: null,
      isShow: false
    };
  },
  mounted() {
    this.initRequest();
  },
  methods: {
    backs(state) {
      this.isShow = state;
    },
    /* 榜单选取 */
    selct(item) {
      this.selectObj = item;
      this.isShow = true;
    },
    /* 数据请求及处理 */
    async initRequest() {
      let list = [];
      /* 请求 */
      let tops = TopId.map(item => {
        return TopList(item);
      });
      /* 数据处理 */
      axios.all(tops).then(val => {
        val.forEach(item => {
          let {
            playlist: { name, id, tracks, coverImgUrl }
          } = item;
          list.push(new TopSort(name, id, tracks, coverImgUrl));
        });
        /* 数据缓存 */
        this.setsongdetials(list);
        SetToplist("TopList", list);
      });
    },
    handle(list) {
      const bottom = list.length > 0 ? "1.2rem" : "";
      this.$refs.rank.style.bottom = bottom;
      this.getbs.refresh();
    }
  }
};
</script>

<style lang="scss" scoped>
.rank-enter,
.rank-leave-to {
  transform: translate3d(100%, 0, 0);
}
.rank-enter-active,
.rank-leave-active {
  transition: all 0.3s linear;
}
.top_list {
  position: fixed;
  width: 100%;
  top: 2.4rem;
  bottom: 0;
  font-size: 0.32rem;
  background: white;
}
</style>