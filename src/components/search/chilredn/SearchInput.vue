<template>
  <div class="inputs">
    <i class="search_icon iconfont">&#xe61a;</i>
    <input type="text" class="serch_input" 
    :placeholder="placeholders" 
    v-model="keyvalue"
    @input='value'/>
    <i class="iconfont search_icon" v-show="keyvalue" @click='clear'>&#xe7b4;</i>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    placeholders: {
      type: String,
      default: "搜索歌曲、歌手"
    }
  },
  data() {
    return {
      keyvalue: ""
    };
  },
  methods:{
      //清空搜索框
      clear(){
          this.keyvalue = ''
      },
      //判断
      value(e){
        if(!e.target.value){
          this.$emit('clear',false)    
        }else{
          this.$emit('clear',true)  
        }
        
      }
  },
  watch:{
      keyvalue(val){
          this.$emit('values',val)
      }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/scss/mixin";
@import "assets/scss/variable.scss";
.inputs {
  box-sizing: border-box;
  padding: 0 0.2rem;
  width: 100%;
  height: 0.8rem;
  @include center();
  .serch_input {
    flex: 1;
    height: 100%;
    outline: none;
    box-sizing: border-box;
    border-right: none;
    border-left: none;
    border-top: none;
    border-bottom: 1px solid #ccc;
    font-size: 0.38rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .search_icon {
    display: block;
    height: 100%;
    width: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
  }
}
</style>