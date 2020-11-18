<template>
  <div class="ocr-select-editor__container-wrap">
    <img src="@/assets/bankbill01.png" alt="" ref="image"/>
    <div class="ocr-select-editor__container-select-range"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    zoom:Number
  },
  data(){
    return {
      imageStyle:{}
    }
  },
  mounted(){
    
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
.ocr-select-editor__container {
  &-wrap {
    height: 100%;
    width: 100%;
    position: relative;
  }
  &-select-range {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 3;
    width: 100%;
  }
  img {
    display: block;
    user-select: none;
  }
}
</style>