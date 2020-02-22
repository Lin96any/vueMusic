<template>
  <div class="singer" ref='singer'>
    <list-view :data="this.artists" @selectSinger="singeritem" ref="list"></list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { hotSinger } from "network";
import { Singer } from "utials/utials";
import ListView from "base/ListView";
import { SetObject, GetObject, SetLocalStorage } from "utials/storage";
/* 加载pinyin库 */
import pinyin from "pinyin";

/* 相关常量定义 */
let HOT_TITLE = "热门";
let HOT_LENGTH = 10;
import Mixins from "utials/mixinStore";
export default {
  mixins: [Mixins],
  name: "Singer.vue",
  data() {
    return {
      artists: []
    };
  },
  mounted() {
    this._gethotsinger();
  },
  methods: {
    handle(list) {
      const bottom = list.length > 0 ? "1.2rem" : "";
      this.$refs.singer.style.bottom = bottom;
      this.getbs.refresh();
    },
    //对数据进行首字母处理，用于排序
    async _gethotsinger(offset = 0, limit = 100) {
      let hotsingerdata = await hotSinger(offset, limit);
      let { code, artists } = hotsingerdata;
      if (code === 200) {
        artists.forEach(item => {
          let pinyins = pinyin(item.name, {
            style: pinyin.FIRST_LETTER,
            style: pinyin.STYLE_NORMAL,
            heteronym: true
          });
          /* 获取首字母 */
          item.Findex = pinyins[0][0].toUpperCase().split("")[0];
        });
        this.artists = this._normalizeSinger(artists);
      }
    },
    _normalizeSinger(list) {
      /* 定义数据模型 */
      let map = {
        hot: {
          title: HOT_TITLE,
          item: []
        }
      };

      /* 循环遍历生成热门数据 并对各个findex添加数据*/
      list.forEach((item, index) => {
        if (index < HOT_LENGTH) {
          map.hot.item.push(
            new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
              aliaName: item.alias[0]
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          };
        }

        map[key].item.push(
          new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias[0]
          })
        );
      });

      let hot = [];
      let ret = [];

      for (let key in map) {
        let mapkey = map[key];
        if (mapkey.title.match(/[a-zA-Z]/)) {
          ret.push(mapkey);
        } else if (mapkey.title === HOT_TITLE) {
          hot.push(mapkey);
        }
      }

      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      return hot.concat(ret);
    },
    singeritem(item) {
      SetObject("singer", item);
      this.$router.push({
        path: "/home/singer/singerdetial"
      });
    }
  },
  components: {
    ListView
  },
  watch: {
    getplaylists(newval) {
      this.handle(newval);
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s linear;
}

.singer {
  position: absolute;
  top: 2.4rem;
  bottom: 0;
  width: 100%;
}
</style>