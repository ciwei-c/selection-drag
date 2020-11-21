export default {
  methods:{
    onMouseover(idx){
      document.querySelector(`.ocr-select-editor__selection-zone--index-${idx}`).style.opacity = "0.8"
    },
    onMouseleave(idx){
      document.querySelector(`.ocr-select-editor__selection-zone--index-${idx}`).style.opacity = "1"
    }
  }
}