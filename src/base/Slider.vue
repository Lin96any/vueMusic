<template>
  <div class="carousel-wrapper">
    <swiper :options="swiperOption" class="carousel-group">
      <swiper-slide
        v-for="(item) in banners"
        :key="item.bannerId"
        class="swiper-item-wrapper"
      >
        <a class="swiper-item" :href="item.url">
          <img v-lazy="item.pic" alt />
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css"; //在全局没引入，这里记得要！
import { swiper, swiperSlide } from "vue-awesome-swiper";
import mixns from "utials/mixinStore";
export default {
  mixins: [mixns],
  name: "Slider.vue",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        speed: 500, //切换速度
        // watchOverflow: false, //当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
        loop: false, //开启循环模式
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        preventClicksPropagation: true, //阻止click冒泡。拖动Swiper时阻止click事件。
        simulateTouch: false, //鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
        pagination: {
          el: ".swiper-pagination"
        },
        on: {
          touchEnd: function(event) {
            //你的事件
          }
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {

  }
};
</script>

<style lang="scss">
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";

.swiper-pagination-bullet-active {
  background: rgba(228, 220, 221, 0.863);
}

.carousel-wrapper {
  width: 100%;
  height: 2.73rem;
  .carousel-group {
    display: flex;
    .swiper-item-wrapper {
      .swiper-item {
        display: block;
        width: 100%;
        @include center();
        img {
          width: 7.02rem;
          height: 2.73rem;
          border-radius: 0.2rem;
          overflow: hidden;
        }
      }
    }
    .swiper-pagination {
      bottom: 0;
    }
  }
}
</style>