<template>
  <div class="ocr-select-editor">
    <tool-sidebar :eventEmit="eventEmit" :eventOn="eventOn" :eventOff="eventOff"/>
    <select-editor-container :eventEmit="eventEmit" :eventOn="eventOn" :eventOff="eventOff" :activeName="activeName"/>
    <select-editor-panel :eventEmit="eventEmit" :eventOn="eventOn" :eventOff="eventOff" @activeChange="(v) => activeName = v"/>
  </div>
</template>

<script>
import ToolSidebar from "./ToolSidebar"
import SelectEditorContainer from "./SelectEditorContainer"
import SelectEditorPanel from "./SelectEditorPanel"
export default {
  data(){
    return {
      activeName:''
    }
  },
  components:{ ToolSidebar, SelectEditorContainer, SelectEditorPanel },
  computed:{
    eventEmit(){
      return this.$emit.bind(this)
    },
    eventOn(){
      return this.$on.bind(this)
    },
    eventOff(){
      return this.$off.bind(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.ocr-select-editor {
  background: #eaeaea;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>