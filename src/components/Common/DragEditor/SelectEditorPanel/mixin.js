export default {
  methods:{
    onMouseover(idx){
      document.querySelector(`.ocr-select-editor__selection-zone--index-${idx}`).style.background = "rgba(230, 60, 60, 0.5)"
    },
    onMouseleave(idx){
      document.querySelector(`.ocr-select-editor__selection-zone--index-${idx}`).style.background = ""
    }
  }
}