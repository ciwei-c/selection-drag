<template>
  <div
    class="ocr-select-editor__selection-zone"
    :class="{'ocr-select-editor__selection-zone--active':active}"
    :style="Object.assign(style, {cursor: isSelectingZone ? 'default' : 'move', zIndex:(isSelectingZone || isMovingZone) ? 0 : 4})"
  >
    <div class="ocr-select-editor__selection-zone-wrap" v-if="active">
      <div 
        v-for="resizeAction in resizeActions" 
        :key="resizeAction"
        :action="resizeAction"
        :class="`ocr-select-editor__selection-zone-dot ocr-select-editor__selection-zone-dot--${resizeAction} ocr-select-editor__selection-zone-dot--zone-index-${index}`"
      ></div>
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
  data() {
    return {
      style: {},
      active: false,
      resizeActions: ['left-top', 'top', 'right-top', 'left', 'right', 'left-bottom', 'bottom', 'right-bottom']
    };
  },
  watch:{
    zoom(newVal, oldVal){
    }
  },
  mounted(){
    this.getBoundingClientRect()
  },
  methods: {
    mouseup(){
      this.handleSelectData(this.data, this)
    },
    getBoundingClientRect(){
      this.zoneBoundingClientRect = this.$el.getBoundingClientRect()
    },
    setClientPosition(prop, dis){
      this.data[prop] = this.originData[prop] + dis
    },
    resize(e){
      let resizex = this.caclClientXTruePosition(e.clientX) - this.resizeStartOffset.clientX
      let resizey = this.caclClientYTruePosition(e.clientY) - this.resizeStartOffset.clientY
      let fn = {
        left:() => this.setClientPosition('startClientX', resizex),
        right: () => this.setClientPosition('endClientX', resizex),
        top: () => this.setClientPosition('startClientY', resizey),
        bottom: () => this.setClientPosition('endClientY', resizey)
      }
      this.resizeAction.split("-").forEach(action=>fn[action]())

      this.render()
    },
    onResizeEnd(){
      this.resizeOffset = null
    },
    render() {
      this.getBoundingClientRect()
      let { startClientX, startClientY, endClientX, endClientY } = this.data;
      let _left = Math.min(startClientX, endClientX) - this.boundingClientRect.left;
      let _top = Math.min(startClientY, endClientY) - this.boundingClientRect.top;
      if(_left < 0) {
        _left = 0
        this.data.startClientX = _left + this.boundingClientRect.left
        this.data.endClientX = _left + Math.abs(endClientX - startClientX) + this.boundingClientRect.left
      }
      if(_top < 0) {
        _top = 0
        this.data.startClientY = _top + this.boundingClientRect.top
        this.data.endClientY = _top + Math.abs(endClientY - startClientY) + this.boundingClientRect.top
      }
      // if( (this.zoneBoundingClientRect.width + _left) > this.boundingClientRect.width) {
      //   _left = this.boundingClientRect.width - this.zoneBoundingClientRect.width
      //   this.data.startClientX = _left + this.boundingClientRect.left
      //   this.data.endClientX = _left + Math.abs(endClientX - startClientX) + this.boundingClientRect.left
      // }
      // if( (this.zoneBoundingClientRect.height + _top) > this.boundingClientRect.height) {
      //   _top = this.boundingClientRect.height - this.zoneBoundingClientRect.height
      //   this.data.startClientY = _top + this.boundingClientRect.top
      //   this.data.endClientY = _top + Math.abs(endClientY - startClientY) + this.boundingClientRect.top
      // }
      this.style = {
        _left,
        _top,
        left: _left + "px",
        top: _top + "px",
        height: Math.abs(endClientY - startClientY) + "px",
        width: Math.abs(endClientX - startClientX) + "px",
      };
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
    select({ clientX, clientY }){
      this.startOffset = { clientX:this.caclClientXTruePosition(clientX), clientY:this.caclClientYTruePosition(clientY)};
      this.originData = Object.assign({}, this.data)
      this.active = true;
    },
    onResizeStart({ clientX, clientY, target }){
      this.resizeStartOffset = { clientX:this.caclClientXTruePosition(clientX), clientY:this.caclClientYTruePosition(clientY)};
      this.originData = Object.assign({}, this.data)
      this.resizeAction = target.getAttribute('action')
      this.active = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.ocr-select-editor__selection-zone {
  border: 1px solid #ccc;
  background: #ebcec4;
  top: 0;
  left: 0;
  opacity: 0.5;
  position: absolute;
  user-select: none;
  &--active {
    z-index: 5 !important;
  }
  &-wrap {
    position: relative;
    height: 100%;
    width: 100%;
    border: 1px solid #409EFF;
  }
  &-dot {
    background: #fff;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    border:2px solid #409EFF;
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