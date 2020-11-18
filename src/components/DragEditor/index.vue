<template>
  <div class="ocr-select-editor">
    <tool-sidebar :eventEmit="eventEmit" :eventOn="eventOn" :eventOff="eventOff"/>
    <select-editor-content :eventEmit="eventEmit" :eventOn="eventOn" :eventOff="eventOff" style="margin-left:60px"/>
  </div>
</template>

<script>
import ToolSidebar from "./ToolSidebar"
import SelectEditorContent from "./SelectEditorContent"
export default {
  components:{ ToolSidebar, SelectEditorContent },
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