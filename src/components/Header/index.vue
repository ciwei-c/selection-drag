<template>
  <div class="ocr-header">
    <div class="ocr-header__left">
      <div class="ocr-header__left-navs">
        <router-link v-for="(nav, idx) in navs" :key="idx" :to="nav.router" :class="{'ocr-header__left-navs--active':nav.router === active}">{{nav.label}}</router-link>
      </div>
    </div>
    <div class="ocr-header__left"></div>
  </div>
</template>

<script>
export default {
  watch:{
    $route:{
      immediate: true,
      handler(v) {
        this.active = v.path
      }
    }
  },
  data(){
    return {
      active:"",
      navs:[{
        label:"模板管理",
        router:"/template"
      },{
        label:"分类器管理",
        router:"/classifier"
      },{
        label:"字段类型管理",
        router:"/field"
      // },{
      //   label:"文档中心",
      //   router:"/doc"
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/color";
.ocr-header {
  height: 60px;
  background: #000;
  display: flex;
  justify-content: space-between;
  width: 100%;
  &__left {
    height: 100%;
    &-navs {
      height: 100%;
      display: flex;
      align-items: center;
      &--active {
        color: $--color-primary !important;
      }
      a {
        display: inline-block;
        cursor: pointer;
        color: #fff;
        line-height: 60px;
        padding: 0 28px;
        font-size: 14px;
        &:hover {
          color: $--color-primary;
        }
      }
    }
  }
}
</style>