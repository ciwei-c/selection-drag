<template>
  <div class="ocr-select-editor__tool-sidebar">
    <div v-for="(action, idx) in actions" :key="idx" :class="`${type === action.type ? 'ocr-select-editor__tool-sidebar--active' : ''}`">
      <el-tooltip class="item" effect="dark" :content="`${action.label}${action.type.startsWith('zoom') ? zoom + '%' : ''}`" placement="right">
        <i :class="action.icon" type="text" @click="action.fn(action)"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import emitMixin from "../emitMixin"
export default {
  mixins:[emitMixin],
  data(){
    return {
      zoom: 100,
      type:'select',
      actions:[{
        label:'拖拽',
        type:'drag',
        icon:'el-icon-rank',
        fn:this.onDrag
      },{
        label:'框选识别区',
        type:'select',
        icon:'el-icon-full-screen',
        fn:this.onSelect
      },{
        label:'放大',
        type:'zoomIn',
        icon:'el-icon-zoom-in',
        fn:this.onZoom
      },{
        label:'缩小',
        type:'zoomOut',
        icon:'el-icon-zoom-out',
        fn:this.onZoom
      }]
    }
  },
  methods:{
    onDrag({type}){
      this.type = type
    },
    onSelect({type}){
      this.type = type
    },
    onZoom(data){
      let zoomValue = data.type === 'zoomIn' ? 10 : -10;
      this.zoom = this.zoom + zoomValue;
      if (this.zoom > 300) {
        this.zoom = 300;
      }
      if (this.zoom < 50) {
        this.zoom = 50;
      }
      this.eventEmit('zoom', this.zoom)
    }
  }
}
</script>

<style lang="scss" scoped>
.ocr-select-editor__tool-sidebar {
  position: absolute;
  z-index: 1;
  padding: 5px 0;
  top: 50%;
  left: 0;
  box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
  border-radius: 0 3px 3px 0;
  transform: translateY(-50%);
  width: 50px;
  background: #fff;
  > div {
    text-align: center;
    padding: 5px 0;
    &.ocr-select-editor__tool-sidebar--active {
      color: #409EFF;
    }
    i {
      font-size: 18px;
      cursor: pointer;
    }
  }
  
}
</style>