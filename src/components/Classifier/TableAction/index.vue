<template>
  <div class="ocr-classifier__table-action">
    <el-button icon="el-icon-plus" type="primary" @click="onCreate">创建分类器</el-button>
    <create-dialog ref="createDialog" />
  </div>
</template>

<script>
import CreateDialog from "./CreateDialog"
export default {
  components:{CreateDialog},
  props:{
    activeName:String
  },
  data(){
    return {
      search:""
    }
  },
  methods:{
    onCreate(){
      this.$refs.createDialog.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.ocr-classifier__table-action {
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