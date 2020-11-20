<template>
  <div
    class="ocr-select-editor__container"
    draggable="false"
    ref="container"
    :style="Object.assign({
      transform:`scale(${zoom/100})`,
      height:`${100 / (zoom/100)}%`,
      width:`calc(${100 / (zoom/100)}% - ${380 / (zoom/100)}px)`
    })"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
  >
    <div ref="rect" :style="{
      transform:`translate(calc(-50% + ${dragTransform.x}px), calc(-50% + ${dragTransform.y}px))`
    }">
      <selection-wrap :mode="mode" @load="getBoundingClientRect">
        <selection-zone
          v-for="(data, idx) in renderDatas"
          :class="`ocr-select-editor__selection-zone--index-${idx} ocr-select-editor__selection-zone--${activeName}`"
          ref="selectionZone"
          :key="data.id"
          :index="idx"
          :data="data"
          :zoom="zoom"
          :parent="parent"
          :isSelectingZone="isSelectingZone"
          :isMovingZone="isMovingZone"
          :boundingClientRect="boundingClientRect"
        />
      </selection-wrap>
    </div>
  </div>
</template>

<script>
import emitMixin from "../emitMixin";
import mixin from "./mixin";
import SelectionZone from "./SelectionZone";
import SelectionWrap from "./SelectionWrap";
export default {
  props:{
    activeName:String
  },
  watch:{
    activeName:{
      immediate:true,
      handler(v){
        this.renderDatas = this.activeName === 'step1' ? this.selectionFieldsDatas : this.selectionZoneDatas
      }
    }
  },
  components: { SelectionZone, SelectionWrap },
  computed:{
    parent(){
      return this
    },
    field(){
      return this.activeName === 'step1' ? 'selectionFieldsDatas' : 'selectionZoneDatas'
    },
    currentSelectIndex(){
      return this[this.field] && this[this.field].length - 1
    }
  },
  data() {
    return {
      dragTransform:{
        x:0,
        y:0
      },
      renderDatas:[],
      zoom: 100,
      selectionZoneDatas: [],
      selectionFieldsDatas: [],
      mode: 'select',
      isDraging: false,
      isSelectingZone: false,
      isMovingZone: false,
      isResizingZone: false,
      boundingClientRect: null
    };
  },
  mixins: [emitMixin, mixin],
  mounted() {
    this.eventOn("zoom", (v) => {
      this.zoom = v
      this.getBoundingClientRect()
    });
    this.eventOn("mode", (v) => {
      this.mode = v
    });
    let that = this
    this.eventOn("closeField", (v) => {
      that.selectionFieldsDatas.splice(v, 1)
      that.renderDatas = that.selectionFieldsDatas
    });
    this.eventOn("closeZone", (v) => {
      that.selectionZoneDatas.splice(v, 1)
      that.renderDatas = that.selectionZoneDatas
    });
    window.addEventListener('resize', this.getBoundingClientRect)
    window.addEventListener('keyup', this.onKeyup)
  },
  beforeDestroy() {
    this.eventOff("zoom");
    this.eventOff("closeField");
    this.eventOff("closeZone");
    window.removeEventListener('resize', this.getBoundingClientRect)
  },
  methods: {
    onKeyup(e){
      // if(e.keyCode === 46) {
      //   let deleteRef = null
      //   if(this.$refs.selectionZone) {
      //     this.$refs.selectionZone.forEach(ref=>{
      //       if(ref.active) {
      //         deleteRef = ref
      //       }
      //     })
      //   }
      // }
    },
    getBoundingClientRect(){
      this.$nextTick(()=>{
        setTimeout(() => {
          let rect = this.$refs.rect.getBoundingClientRect()
          this.boundingClientRect = {
            height:rect.height,
            left:rect.left,
            top:rect.top,
            width:rect.width, 
          }
        })
      });
    },
    onMouseDown(e) {
      e.preventDefault()
      try { this.$refs.selectionZone.forEach((v) => v.unSelect()) } catch (error) {}
      const getCurrentSelectionZone = (classList, symbol) => {
        let idx = Array.from(classList).filter(v=>v.indexOf(symbol) > -1)[0].split(symbol)[1]
        return this.$refs.selectionZone[Number(idx)]
      }
      let node = e.target
      let { classList } = node
      if(this.mode === 'select') {
        if(classList.contains('ocr-select-editor__container-select-range')){
          this.isSelectingZone = true;
          this[this.field].push({
            startClientX: this.caclClientXTruePosition(e.clientX),
            startClientY: this.caclClientYTruePosition(e.clientY),
            id:`${Math.random()}`
          })
        } else if (classList.contains('ocr-select-editor__selection-zone-dot')){
          this.currentSelectionZone = getCurrentSelectionZone(node.classList, '--zone-index-')
          this.currentSelectionZone.onResizeStart(e)
          this.isResizingZone = true
        } else {
          try {
            while(!node.classList.contains('ocr-select-editor__selection-zone')){
              node = node.parentNode
            }
            this.currentSelectionZone = getCurrentSelectionZone(node.classList, '--index-')
            this.currentSelectionZone.select(e)
            this.isMovingZone = true
            this.isSelectingZone = false
          } catch (error) {}
        }
      } else {
        if(classList.contains('ocr-select-editor__container-drag-range')) {
          this.dragData = {
            startClientX: this.caclClientXTruePosition(e.clientX),
            startClientY: this.caclClientYTruePosition(e.clientY),
            startTransformX: this.dragTransform.x,
            startTransformY: this.dragTransform.y
          }
          this.isDraging = true
        }
      }
    },
    setSelectZoneData(e){
      Object.assign(this[this.field][this.currentSelectIndex], {
        endClientX:this.caclClientXTruePosition(this.caclClientXBorderValue(e.clientX)),
        endClientY:this.caclClientYTruePosition(this.caclClientYBorderValue(e.clientY))
      })
      this.$refs.selectionZone[this.currentSelectIndex].render()
    },
    onMouseMove(e) {
      e.preventDefault()
      if(this.mode === 'select') {
        if(this.isSelectingZone){
          this.setSelectZoneData(e)
        } else if (this.isMovingZone) {
          this.currentSelectionZone.move(e)
        } else if (this.isResizingZone) {
          this.currentSelectionZone.resize(e)
        }
      } else {
        if(this.isDraging) {
          let { startTransformX, startTransformY, startClientX, startClientY } = this.dragData
          let disx = this.caclClientXTruePosition(e.clientX) - startClientX
          let disy = this.caclClientYTruePosition(e.clientY) - startClientY

          this.dragTransform.x = startTransformX + disx
          this.dragTransform.y = startTransformY + disy
        }
      }
    },
    onMouseUp(e) {
      e.preventDefault()
      if(this.mode === 'select'){
        if(this.isSelectingZone){
          this.setSelectZoneData(e)
          let selectData = this.handleSelectData(this[this.field][this.currentSelectIndex])
          if(Math.abs(selectData.startClientX - selectData.endClientX) < 5 || Math.abs(selectData.startClientY - selectData.endClientY) < 5){
            this[this.field].splice(this.currentSelectIndex, 1)
          } else {
            this.$refs.selectionZone[this.currentSelectIndex].render()
          }
          this.eventEmit(this.activeName === 'step1' ? 'fieldSelect' : 'zoneSelect', {
            data: selectData,
            index: this.currentSelectIndex
          })
        } else {
          this.currentSelectionZone && this.currentSelectionZone.mouseup()
        }
      } else {
        this.getBoundingClientRect()
      }
      
      this.isSelectingZone = false;
      this.isDraging = false;
      this.isMovingZone = false;
      this.isResizingZone = false;
      this.currentSelectionZone = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.ocr-select-editor__container {
  position: relative;
  display: inline-block;
  user-select: none;
  transform-origin: 0% 0%;
  height: 100%;
  width: 100%;
  > div:first-child {
    position: absolute;
    left: 50%;
    top: 50%;
  }
}
</style>