<template>
  <div class="ocr-select-editor__tool-sidebar">
    <div v-for="(action, idx) in actions" :key="idx" :class="`${type === action.type ? 'ocr-select-editor__tool-sidebar--active' : ''}`" v-show="!action.limit || action.limit === activeName">
      <el-tooltip class="item" effect="dark" :content="`${action.label}`" placement="right">
        <i :class="action.icon" type="text" @click="action.fn(action)" v-if="action.type !== 'insertTable'"></i>
         <el-popover
            v-else
            placement="right"
            width="160"
            trigger="click">
            <div>
              插入<el-input-number size="mini" :controls="false" style="width:50px;margin:0 10px" :min="2" v-model="columns"></el-input-number>列的表格
              <div style="margin-top:20px;text-align:center">
                <el-button type="primary" style="width:100%" @click="onInsertTable">插入</el-button>
              </div>
            </div>
            <i :class="action.icon" slot="reference" type="text" @click="action.fn(action)"></i>
          </el-popover>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import emitMixin from "../emitMixin"
export default {
  mixins:[emitMixin],
  props:{
    activeName:String
  },
  mounted(){
    this.eventOn('load', ()=>{
      let containerWidth = document.querySelector(".ocr-select-editor__container").offsetWidth * 0.7
      let imageWidth = document.querySelector(".ocr-select-editor__container-image").offsetWidth
      if(imageWidth > containerWidth) {
        let rateCount = Math.floor((imageWidth - containerWidth) / (imageWidth * 0.1))
        while(rateCount > 0) {
          this.onZoom({type:'zoomOut'})
          rateCount --
        }
      }
    })
  },
  data(){
    return {
      columns:2,
      zoom: 100,
      type:'select',
      actions:[{
        label:'拖拽',
        type:'drag',
        icon:'el-icon-rank',
        fn:this.onDrag
      },{
        label:'框选参照字段',
        type:'select',
        limit: 'step1',
        icon:'el-icon-full-screen',
        fn:this.onSelect
      },{
        label:'框选识别区',
        type:'select',
        limit: 'step2',
        icon:'el-icon-full-screen',
        fn:this.onSelect
      // },{
      //   label:'插入表格',
      //   type:'insertTable',
      //   limit: 'step2',
      //   icon:'el-icon-s-grid',
      //   fn:this.insertTable
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
      this.eventEmit('mode', type)
    },
    onSelect({type}){
      this.type = type
      this.eventEmit('mode', type)
    },
    insertTable(){
    },
    onInsertTable(){
      this.eventEmit('insertTable', this.columns)
    },
    onZoom(data){
      let zoomValue = data.type === 'zoomIn' ? 10 : -10;
      this.zoom = this.zoom + zoomValue;
      if (this.zoom > 500) {
        this.zoom = 500;
      }
      if (this.zoom < 10) {
        this.zoom = 10;
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