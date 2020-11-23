<template>
  <span style="margin-right:10px">
    <el-button @click="onAdd">添加自定义模板</el-button>
    <ocr-dialog :visible.sync="visible" title="添加自定义模板" width="600px" @confirm="onConfirm">
      <div style="transform:translateY(-15px)">
        <el-input placeholder="请输入模板名称进行搜索" v-model="search"></el-input>
      </div>
      <ocr-table :columns="columns" :data="data" :enablePage="false" :enableSelect="true"></ocr-table>
      <div style="margin-top:10px;font-size:12px">注：已发布的模板方可参与分类</div>
    </ocr-dialog>
  </span>
</template>

<script>
export default {
  data(){
    return {
      data:[{
        templateName:"模板名称",
        templateId:"e995fd458226de8b0e955e53fdf9a019"
      },{
        templateName:"模板名称2",
        templateId:"e995fd458226de8b0e955e53fdf9a019"
      }],
      columns:[{
        title:"模板名称",
        key:"templateName"
      },{
        title:"模板ID",
        key:"templateId"
      }],
      search:'',
      visible:false,
      presetTemplates:[{
        label:"大陆身份证正面"
      },{
        label:"大陆身份证背面"
      },{
        label:"银行卡"
      },{
        label:"行驶证正页"
      },{
        label:"行驶证副页"
      },{
        label:"驾驶证"
      },{
        label:"营业执照"
      }],
      moreTemplates:[]
    }
  },
  methods:{
    onAdd(){
      this.visible = true
    },
    onConfirm(){
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/color";

</style>