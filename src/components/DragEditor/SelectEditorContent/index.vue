<template>
  <div
    class="ocr-select-editor__content"
     :style="{
      transform:`scale(${zoom/100})`,
      height:`${100 / (zoom/100)}%`,
      width:`${100 / (zoom/100)}%`
    }"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
  >
    <div ref="rect">
      <selection-wrap :zoom="zoom" @init="getBoundingClientRect">
        <selection-zone
          v-for="(data, idx) in selectionZoneDatas"
          :class="`ocr-select-editor__selection-zone--index-${idx}`"
          ref="selectionZone"
          :key="idx"
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
import SelectionZone from "./SelectionZone";
import SelectionWrap from "./SelectionWrap";
export default {
  components: { SelectionZone, SelectionWrap },
  computed:{
    parent(){
      return this
    }
  },
  data() {
    return {
      zoom: 100,
      selectionZoneDatas: [],
      isSelectingZone: false,
      isMovingZone: false,
      isResizingZone: false,
      boundingClientRect: null
    };
  },
  mixins: [emitMixin],
  mounted() {
    this.eventOn("zoom", (v) => {
      this.zoom = v
      this.getBoundingClientRect()
    });
  },
  beforeDestroy() {
    this.eventOff("zoom");
  },
  methods: {
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
    caclClientXTruePosition(value){
      let rate = 1 + (( this.zoom - 100 ) / 100)
      return value / rate - 60 * ( 1 - this.zoom / 100 )
    },
    caclClientYTruePosition(value){
      let rate = 1 + (( this.zoom - 100 ) / 100)
      return value / rate
    },
    onMouseDown(e) {
      try { this.$refs.selectionZone.forEach((v) => v.unSelect()) } catch (error) {}
        const getCurrentSelectionZone = (classList, symbol) => {
        let idx = Array.from(classList).filter(v=>v.indexOf(symbol) > -1)[0].split(symbol)[1]
        return this.$refs.selectionZone[Number(idx)]
      }
      let node = e.target
      let { classList } = node
      if(classList.contains('ocr-select-editor__content-select-range')){
        this.isSelectingZone = true;
        this.selectionZoneDatas.push({
          startClientX: this.caclClientXTruePosition(e.clientX),
          startClientY: this.caclClientYTruePosition(e.clientY)
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
    },
    setSelectZoneData(e){
      let idx = this.selectionZoneDatas.length - 1
      Object.assign(this.selectionZoneDatas[idx], {
        endClientX:this.caclClientXTruePosition(e.clientX),
        endClientY:this.caclClientYTruePosition(e.clientY)
      })
      this.$refs.selectionZone[idx].render()
    },
    onMouseMove(e) {
      if(this.isSelectingZone){
        this.setSelectZoneData(e)
      } else if (this.isMovingZone) {
        this.currentSelectionZone.move(e)
      } else if (this.isResizingZone) {
        this.currentSelectionZone.resize(e)
      }
    },
    onMouseUp(e) {
      if(this.isSelectingZone){
        e && this.setSelectZoneData(e)
        let idx = this.selectionZoneDatas.length - 1
        let selectData = this.selectionZoneDatas[idx]
        let { startClientX, startClientY, endClientX, endClientY } = selectData
        if(startClientX > endClientX){
          selectData.startClientX = endClientX
          selectData.endClientX = startClientX
        }
        if(startClientY > endClientY){
          selectData.startClientY = endClientY
          selectData.endClientY = startClientY
        }
        if(Math.abs(startClientX - endClientX) < 5 || Math.abs(startClientY - endClientY) < 5) {
          this.selectionZoneDatas.splice(idx, 1)
        } else {
          this.$refs.selectionZone[idx].render()
        }
      } else {
        this.currentSelectionZone && this.currentSelectionZone.mouseup()
      }
      
      this.isSelectingZone = false;
      this.isMovingZone = false;
      this.isResizingZone = false;
      this.currentSelectionZone = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.ocr-select-editor__content {
  position: relative;
  display: inline-block;
  user-select: none;
  transform-origin: 0% 0%;
  height: 100%;
  width: 100%;
  > div:first-child {
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }
}
</style>