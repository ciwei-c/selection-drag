<template>
  <div class="ocr-template">
    <table-action :activeName="activeName" />
    <el-tabs v-model="activeName">
      <el-tab-pane name="preset">
        <span slot="label">预置模板 </span>
        <el-tooltip placement="top" slot="label" effect="light">
          <div slot="content" style="width:200px">预置模板无需编辑，可直接进行调用或训练自定义分类器，如需更多预置模板可点击“添加更多”进行勾选发布，各模板详细介绍可参考技术文档</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
        <ocr-table :columns="presetColumns" :data="presetData"></ocr-table>
      </el-tab-pane>
      <el-tab-pane label="自定义模板" name="custom">
        <ocr-table :columns="customColumns" :data="customData"></ocr-table>
      </el-tab-pane>
    </el-tabs>
    <try-dialog ref="tryDialog"/>
  </div>
</template>

<script>
import ImagePreviewCell from "@/components/Template/ImagePreviewCell"
import TableAction from "@/components/Template/TableAction"
import TryDialog from "@/components/Template/TryDialog"
import CopyCell from "@/components/Template/CopyCell"
import JsonCell from "@/components/Common/JsonCell"
import {parseTime} from "@/utils"
export default {
  components:{ImagePreviewCell, CopyCell, TableAction, JsonCell, TryDialog},
  data() {
    return {
      activeName: "custom",
      presetColumns:[],
      customColumns:[],
      presetData:[{}],
      customData:[{}]
    };
  },
  mounted(){
    this.setColumns()
    this.setFakeData()
  },
  methods: {
    setFakeData(){
      let data = [{
        templateName:'大陆身份证正面新品',
        templateImage:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        templateId:'e995fd458226de8b0e955e53fdf9a0192020',
        createTime:'2020-11-17 10:16:22',
        modifiyTime:'2020-11-17 10:16:22'
      },{
        templateName:'大陆身份证正面新品',
        templateImage:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        templateId:'e995fd458226de8b0e955e53fdf9a0192020',
        createTime:'2020-11-17 10:16:22',
        modifiyTime:'2020-11-17 10:16:22'
      }]
      this.presetData = data
      this.customData = data
    },
    setColumns(){
      let columns = [{
        title:"模板名称",
        key:"templateName"
      },{
        title:"模板图片",
        key:"templateImage",
        format:(row)=>{
          return <ImagePreviewCell src={row.templateImage} />
        }
      },{
        title:"模板ID（templateSign）",
        width: 350,
        key:"templateId",
        format:(row)=>{
          return <CopyCell content={row.templateId} />
        }
      },{
        title:"发布时间",
        key:"createTime",
        headerFormat:({row})=>{
          return <div>发布时间 <i class="el-icon-files"></i></div>
        },
        format:(row)=>{
          return parseTime(row.createTime)
        }
      },{
        title:"修改时间",
        key:"modifiyTime",
        format:(row)=>{
          return parseTime(row.modifiyTime)
        }
      }]
      let presetColumns = columns.map(v=>Object.assign({}, v))
      presetColumns.push({
        title:"操作",
        key:"action",
        width:140,
        format:(row)=>{
          return <div>
            <JsonCell />
            <el-button type="text" on-click={()=>this.onTry()}>试一试</el-button>
          </div>
        }
      })
      let customColumns = columns.map(v=>Object.assign({}, v))
      customColumns.push({
        title:"操作",
        width:140,
        key:"action",
        format:(row)=>{
          return <div>
            <el-button type="text" on-click={()=>this.onTry()}>试一试</el-button>
            <el-button type="text" on-click={()=>this.onEdit(row)}>编辑</el-button>
            <el-button type="text">删除</el-button>
          </div>
        }
      })
      this.presetColumns = presetColumns
      this.customColumns = customColumns
    },
    onEdit() {
      this.$router.push({
        path:'/template-editor'
      })
    },
    onTry(){
      this.$refs.tryDialog.show()
    }
  },
};
</script>

<style lang="scss" >
.ocr-template {
  padding: 20px;
  position: relative;
}
</style>