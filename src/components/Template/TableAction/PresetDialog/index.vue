<template>
  <ocr-dialog :visible.sync="visible" title="添加更多模板" append-to-body confirmText="添加">
    <ocr-table :columns="columns" :data="data" enableSelect></ocr-table>
  </ocr-dialog>
</template>

<script>
import ImagePreviewCell from "@/components/Template/ImagePreviewCell"
import JsonCell from "@/components/Common/JsonCell"
export default {
  components:{ImagePreviewCell},
  data(){
    return {
      data:[{
        templateName:"火车票",
        templateImage:"https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      },{
        templateName:"火车票2",
        templateImage:"https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      }],
      columns:[{
        title:"模板名称",
        key:"templateName"
      },{
        title:"模板图片",
        key:"templateImage",
        format:(row)=>{
          return <ImagePreviewCell src={row.templateImage} />
        }
      },{
        title:"返回json",
        key:"templateJson",
        format:(row)=>{
          return <JsonCell />
        }
      },{
        title:"变更通知",
        key:"templateNotice",
        format:(row)=>{
          return <el-button type="text">查看更多</el-button>
        }
      }],
      visible:false
    }
  },
  methods:{
    show(){
      this.visible = true
    }
  }
}
</script>

<style>

</style>