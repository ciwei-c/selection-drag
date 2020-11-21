<template>
  <div
    class="ocr-select-editor__selection-zone"
    :class="{'ocr-select-editor__selection-zone--active':active}"
    :style="Object.assign(style, {cursor: isSelectingZone ? 'default' : 'move', zIndex:(isSelectingZone || isMovingZone) ? 0 : 4})"
  >
    <div class="ocr-select-editor__selection-zone-wrap">
      <template v-if="active">
        <div 
          v-for="resizeAction in resizeActions" 
          :key="resizeAction"
          :action="resizeAction"
          :class="`ocr-select-editor__selection-zone-dot ocr-select-editor__selection-zone-dot--${resizeAction} ocr-select-editor__selection-zone-dot--zone-index-${index}`"
        ></div>
        <div 
          v-for="(position, idx) in data.linesPosition" 
          v-show="active" 
          :key="`${idx}-dot`"
          :index="idx"
          :class="`ocr-select-editor__table-dot ocr-select-editor__table-dot--zone-index-${index}`"
          :style="{left:`${position}%`}"
        ></div>
      </template>
      <div v-for="(position, idx) in data.linesPosition" :key="`${idx}-line`" class="ocr-select-editor__table-line" :style="{left:`${position}%`}"></div>
    </div>
  </div>
</template>

<script>
import mixin from "../mixin";
export default {
  mixins:[mixin],
  props: {
    data: Object,
    isSelectingZone: Boolean,
    isMovingZone: Boolean,
    boundingClientRect: Object,
    index: Number,
    zoom: Number,
    parent: Object
  },
  mounted(){
    let { startClientX, startClientY, endClientX, endClientY } = this.data;
    this.setStyle({
      left: Math.min(startClientX, endClientX) + "px",
      top: Math.min(startClientY, endClientY) + "px",
      height: Math.abs(endClientY - startClientY) + "px",
      width: Math.abs(endClientX - startClientX) + "px",
    })
  },
  data() {
    return {
      style: {},
      active: false,
      resizeActions: ['left-top', 'top', 'right-top', 'left', 'right', 'left-bottom', 'bottom', 'right-bottom']
    };
  },
  methods: {
    mouseup(){
      if(this.data.linesPosition) {
        this.data.linesPosition = this.data.linesPosition.sort((a,b)=>{
          return a - b
        })
      }
      this.getBoundingClientRect()
      this.handleSelectData(this.data, this)
      this.parent.eventEmit(this.parent.activeName === 'step1' ? 'fieldSelect' : 'zoneSelect', {
        data: this.data,
        index: this.index
      })
    },
    getBoundingClientRect(){
      this.zoneBoundingClientRect = this.$el.getBoundingClientRect()
    },
    setClientPosition(prop, dis){
      this.data[prop] = this.originData[prop] + dis
    },
    resize(e){
      let resizex = this.caclClientXTruePosition(this.caclClientXBorderValue(e.clientX)) - this.resizeStartOffset.clientX
      let resizey = this.caclClientYTruePosition(this.caclClientYBorderValue(e.clientY)) - this.resizeStartOffset.clientY
      let fn = {
        left:() => this.setClientPosition('startClientX', resizex),
        right: () => this.setClientPosition('endClientX', resizex),
        top: () => this.setClientPosition('startClientY', resizey),
        bottom: () => this.setClientPosition('endClientY', resizey)
      }
      this.resizeAction.split("-").forEach(action=>fn[action]())

      this.render()
    },
    resizeTable(e){
      let resizex = this.caclClientXTruePosition(this.caclClientXBorderValue(e.clientX)) - this.resizeTableStartOffset.clientX
      let position = this.startPosition + (resizex / this.zoneBoundingClientRect.width) * 100
      if(position > 100) position = 100
      if(position < 0) position = 0
      this.data.linesPosition[this.resizeTableIndex] = position
      this.render()
    },
    setBorderValue(direction){
      let { startClientX, startClientY, endClientX, endClientY } = this.data;
      let prop = direction === 'X' ? 'width' : 'height'
      let rate = this.zoom / 100
      let start = (direction === 'X' ? startClientX : startClientY)
      let end = (direction === 'X' ? endClientX : endClientY)
      let value = Math.min(start, end)
      const set = () => {
        this.data[`startClient${direction}`] = value
        this.data[`endClient${direction}`] = value + Math.abs( end - start )
      }
      if(this.isMovingZone) {
        if(value < 0) {
          value = 0
          set()
        }
        if( (this.zoneBoundingClientRect[prop] / rate + value) > this.boundingClientRect[prop] / rate) {
          value = this.boundingClientRect[prop] / rate - this.zoneBoundingClientRect[prop] / rate
          set()
        }
      }
      return value
    },
    setStyle({left,top, height, width}){
      let { startClientX, startClientY, endClientX, endClientY } = this.data;
      this.style = {
        left: this.setBorderValue("X") + "px",
        top: this.setBorderValue("Y") + "px",
        height: Math.abs(endClientY - startClientY) + "px",
        width: Math.abs(endClientX - startClientX) + "px",
      };
    },
    render() {
      this.getBoundingClientRect()
      let { startClientX, startClientY, endClientX, endClientY } = this.data;
      this.setStyle({
        left: this.setBorderValue("X") + "px",
        top: this.setBorderValue("Y") + "px",
        height: Math.abs(endClientY - startClientY) + "px",
        width: Math.abs(endClientX - startClientX) + "px",
      })
    },
    isZone(e){
      let { classList } = e.target
      return classList.contains('ocr-select-editor__selection-zone') || classList.contains('ocr-select-editor__selection-zone-wrap')
    },
    move(e){
      let disx = this.caclClientXTruePosition(e.clientX) - this.startOffset.clientX
      let disy = this.caclClientYTruePosition(e.clientY) - this.startOffset.clientY
      this.setClientPosition('startClientX', disx)
      this.setClientPosition('endClientX', disx)
      this.setClientPosition('startClientY', disy)
      this.setClientPosition('endClientY', disy)
      this.render()
    },
    unSelect(){
      this.active = false
    },
    beforeSelect({ clientX, clientY }){
      this.originData = Object.assign({}, this.data)
      this.active = true;
      return { clientX:this.caclClientXTruePosition(clientX), clientY:this.caclClientYTruePosition(clientY)}
    },
    onResizeTable(e){
      this.resizeTableStartOffset = this.beforeSelect(e)
      this.resizeTableIndex = e.target.getAttribute('index')
      this.startPosition = this.originData.linesPosition[this.resizeTableIndex]
    },
    select(e){
      this.startOffset = this.beforeSelect(e);
    },
    onResizeStart(e){
      this.resizeStartOffset = this.beforeSelect(e);
      this.resizeAction = e.target.getAttribute('action')
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/color";
.ocr-select-editor__table-line {
  position: absolute;
  height: 100%;
  width: 1px;
  top: 0;
  transform: translateX(-50%);
  background: $--color-primary;
}
.ocr-select-editor__table-dot {
  background: #fff;
  height: 6px;
  top: 50%;
  z-index: 1;
  width: 6px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  cursor: w-resize;
  border:2px solid $--color-primary;;
  position: absolute;
}
.ocr-select-editor__selection-zone {
  border: 1px solid #ccc;
  top: 0;
  left: 0;
  position: absolute;
  user-select: none;
  &--active {
    z-index: 5 !important;
  }
  &-wrap {
    position: relative;
    height: 100%;
    width: 100%;
    border: 1px solid $--color-primary;;
  }
  &--step1 {
    background: rgba($--color-warning, 0.5);
  }
  &--step2 {
    background: rgba($--color-primary, 0.5);
  }
  &-dot {
    background: #fff;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    border:2px solid $--color-primary;;
    position: absolute;
    z-index: 6;
    &--left-top {
      top: -5px;
      left: -5px;
      cursor: nw-resize;
    }
    &--right-top {
      top: -5px;
      right: -5px;
      cursor: ne-resize;
    }
    &--top {
      top: -5px;
      left: 50%;
      cursor: n-resize;
      transform: translateX(-50%);
    }
    &--left {
      top: 50%;
      left: -5px;
      cursor: w-resize;
      transform: translateY(-50%);
    }
    &--right {
      top: 50%;
      right: -5px;
      cursor: e-resize;
      transform: translateY(-50%);
    }
    &--left-bottom {
      bottom: -5px;
      cursor: sw-resize;
      left: -5px;
    }
    &--right-bottom {
      bottom: -5px;
      cursor: se-resize;
      right: -5px;
    }
    &--bottom {
      bottom: -5px;
      cursor: s-resize;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>