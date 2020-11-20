<template>
  <div id="app">
    <common-header />
    <div style="height:calc(100% - 60px)">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/Header"
export default {
  name: 'App',
  components:{CommonHeader}
}
</script>

<style>
#app {
  height: 100%;
}
</style>
