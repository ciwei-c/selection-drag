export default {
  methods: {
    caclClientXTruePosition(value) {
      let rate = 1 + (this.zoom - 100) / 100;
      return value / rate - 60 * (1 - this.zoom / 100);
    },
    caclClientYTruePosition(value) {
      let rate = 1 + (this.zoom - 100) / 100;
      return value / rate - 100 * (1 - this.zoom / 100);
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
      node.render()
    }
  },
};
