<template>
  <div class="ocr-template__table-action">
    <el-button icon="el-icon-plus" type="primary" v-if="activeName === 'preset'" @click="onAddMore">添加更多</el-button>
    <el-button icon="el-icon-plus" type="primary" v-else @click="onCreateTemplate">创建模板</el-button>
    <el-input v-model="search" placeholder="搜索" suffix-icon="el-icon-search"></el-input>
    <preset-dialog ref="presetDialog"/>
    <custom-dialog ref="customDialog" />
  </div>
</template>

<script>
import PresetDialog from "./PresetDialog"
import CustomDialog from "./CustomDialog"
export default {
  components:{PresetDialog, CustomDialog},
  props:{
    activeName:String
  },
  data(){
    return {
      search:""
    }
  },
  methods:{
    onAddMore(){
      this.$refs.presetDialog.show()
    },
    onCreateTemplate(){
      this.$refs.customDialog.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.ocr-template__table-action {
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 22px;
  z-index: 1;
  > button {
    margin-right: 10px;
  }
}
</style>