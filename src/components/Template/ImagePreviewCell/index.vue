<template>
  <div>
    <el-popover
      placement="right"
      width="335"
      trigger="hover">
      <img :src="src" alt="" style="width:335px">
      <img :src="src" alt="" style="width:100px" slot="reference">
    </el-popover>
  </div>
</template>

<script>
export default {
  props:{
    src:String
  }
}
</script>

<style>

</style>