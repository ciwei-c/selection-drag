<template>
  <div class="ocr-select-editor__container-wrap">
    <img :src="image" alt="" ref="image" @load="$emit('load')" class="ocr-select-editor__container-image"/>
    <div class="ocr-select-editor__container-select-range"></div>
    <div class="ocr-select-editor__container-drag-range" v-if="mode === 'drag'"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    zoom:Number,
    mode:String,
    image:String
  },
  data(){
    return {
      width:0, 
      imageStyle:{}
    }
  },
  mounted(){
    this.width = document.querySelector(".ocr-select-editor__container").offsetWidth * 0.7
  }
}
</script>

<style lang="scss" scoped>
.ocr-select-editor__container {
  &-wrap {
    position: relative;
  }
  &-select-range {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 3;
    width: 100%;
    user-select: none;
  }
  &-drag-range {
    position: absolute;
    cursor: move;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 99;
    width: 100%;
    user-select: none;
  }
  img {
    display: block;
    user-select: none;
  }
}
</style>