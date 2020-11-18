<template>
  <div id="app">
    <drag-editor />
  </div>
</template>

<script>
import DragEditor from './components/DragEditor'

export default {
  name: 'App',
  components: {
    DragEditor
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
