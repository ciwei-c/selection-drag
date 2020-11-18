<template>
  <div
    class="ocr-select-editor__container"
    ref="container"
    :style="Object.assign({
      transform:`scale(${zoom/100})`,
      height:`${100 / (zoom/100)}%`,
      width:`${100 / (zoom/100)}%`
    }, positionStyle)"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
  >
    <div ref="rect">
      <selection-wrap>
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
import mixin from "./mixin";
import SelectionZone from "./SelectionZone";
import SelectionWrap from "./SelectionWrap";
export default {
  components: { SelectionZone, SelectionWrap },
  computed:{
    parent(){
      return this
    },
    currentSelectIndex(){
      return this.selectionZoneDatas && this.selectionZoneDatas.length - 1
    }
  },
  data() {
    return {
      positionStyle:{
        paddingLeft:'60px',
        paddingTop:'100px'
      },
      zoom: 100,
      selectionZoneDatas: [],
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
    this.getBoundingClientRect()
  },
  beforeDestroy() {
    this.eventOff("zoom");
  },
  methods: {
    // setPositonStyle(){
    //   setTimeout(() => {
    //     let rect = this.$refs.rect.getBoundingClientRect()
    //     let width = rect.width
    //     let height = rect.height
    //     let containerRect = this.$refs.container.getBoundingClientRect()
    //     let containerWidth = containerRect.width
    //     let containerHeight = containerRect.height
    //     this.positionStyle = {
    //       paddingLeft: (containerWidth - width) / 2 + 'px',
    //       paddingTop: (containerHeight - height) / 2 + 'px'
    //     }
    //     this.getBoundingClientRect()
    //   });
    // },
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
      try { this.$refs.selectionZone.forEach((v) => v.unSelect()) } catch (error) {}
      const getCurrentSelectionZone = (classList, symbol) => {
        let idx = Array.from(classList).filter(v=>v.indexOf(symbol) > -1)[0].split(symbol)[1]
        return this.$refs.selectionZone[Number(idx)]
      }
      let node = e.target
      let { classList } = node
      if(classList.contains('ocr-select-editor__container-select-range')){
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
      Object.assign(this.selectionZoneDatas[this.currentSelectIndex], {
        endClientX:this.caclClientXTruePosition(e.clientX),
        endClientY:this.caclClientYTruePosition(e.clientY)
      })
      this.$refs.selectionZone[this.currentSelectIndex].render()
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
        this.setSelectZoneData(e)
        this.handleSelectData(this.selectionZoneDatas[this.currentSelectIndex], this.$refs.selectionZone[this.currentSelectIndex])
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
.ocr-select-editor__container {
  position: relative;
  display: inline-block;
  user-select: none;
  transform-origin: 0% 0%;
  height: 100%;
  width: 100%;
  > div:first-child {
    position: absolute;
  }
}
</style>