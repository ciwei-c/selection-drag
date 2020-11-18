<template>
  <div class="ocr-select-editor__content-wrap">
    <img src="@/assets/bankbill01.png" alt="" ref="image" :style="imageStyle"/>
    <div class="ocr-select-editor__content-select-range"></div>
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
    this.$nextTick(()=>{
      setTimeout(() => {
        let rect = this.$refs.image.getBoundingClientRect()
        this.originRect = {
          width: rect.width,
          height: rect.height
        }
        this.setImageStyle()
        this.$emit('init')
      });
    })
  },
  watch:{
    zoom(v){
      this.setImageStyle()
    }
  },
  methods:{
    setImageStyle(){
      // this.imageStyle = {
       
      //   width:this.originRect.width * (this.zoom / 100) + 'px',
      //   height:this.originRect.height * (this.zoom / 100) + 'px'
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.ocr-select-editor__content {
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