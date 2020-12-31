<template>
  <div class="ocr-field__table-action">
    <el-button icon="el-icon-plus" type="primary" @click="createCustom">创建字段类型</el-button>
    <el-button icon="el-icon-plus" @click="createCustom">添加预置类型</el-button>
    <custom-dialog ref="customDialog" @success="parent.getFields"/>
  </div>
</template>

<script>
import CustomDialog from "./CustomDialog"
export default {
  components:{CustomDialog},
  props:{
    activeName:String,
    parent:Object
  },
  data(){
    return {
      search:""
    }
  },
  methods:{
    createCustom(){
      this.$refs.customDialog.show()
    },
    editCustom(row){
      this.$refs.customDialog.show(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.ocr-field__table-action {
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 22px;
  z-index: 1;
  > button {
    margin-right: 10px;
    margin-left: 0;
  }
}
</style>