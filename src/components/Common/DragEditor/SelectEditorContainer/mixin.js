export default {
  methods: {
    caclClientXBorderValue(value){
      let rightBorderValue = this.boundingClientRect.left + this.boundingClientRect.width
      let leftBorderValue = this.boundingClientRect.left
      if(value > rightBorderValue) value = rightBorderValue
      if(value < leftBorderValue) value = leftBorderValue
      return value
    },
    caclClientYBorderValue(value){
      let bottomBorderValue = this.boundingClientRect.top + this.boundingClientRect.height
      let topBorderValue = this.boundingClientRect.top
      if(value > bottomBorderValue) value = bottomBorderValue
      if(value < topBorderValue) value = topBorderValue
      return value
    },
    caclClientXTruePosition(value) {
      let rate = 1 + (this.zoom - 100) / 100;
      return (value - this.boundingClientRect.left) / rate;
    },
    caclClientYTruePosition(value) {
      let rate = 1 + (this.zoom - 100) / 100;
      return (value - this.boundingClientRect.top) / rate;
    },
    handleSelectData(data, node){
      let { startClientX, startClientY, endClientX, endClientY } = data
      if(startClientX > endClientX){
        data.startClientX = endClientX
        data.endClientX = startClientX
      }
      if(startClientY > endClientY){
        data.startClientY = endClientY
        data.endClientY = startClientY
      }
      node && node.render()
      return data
    }
  },
};
