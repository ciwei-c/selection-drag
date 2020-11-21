export default {
  data(){
    return {
      selectTableDatas:[],
    }
  },
  mounted() {
    this.eventOn("insertTable", (v) => {
      const img = document.querySelector(".ocr-select-editor__container-image")
      let width = img.offsetWidth / 3
      let height = img.offsetHeight / 3
      let data = {
        startClientX:0,
        startClientY:0,
        endClientX:width,
        endClientY:height,
        type:'insertTable',
        columns:v,
        linesPosition:[]
      }
      for(let i = 1; i < v; i ++){
        data.linesPosition.push( (100 * i / v) )
      }
      console.log(data)
      this.eventEmit('zoneSelect', {
        data,
        index: this.selectionZoneDatas.length
      })
      this.selectionZoneDatas.push(data)
      this.renderDatas = this.selectionZoneDatas
    });
  },
  beforeDestroy(){
    this.eventOff("insertTable")
  }
};
