<template>
  <div class="ocr-template">
    <table-action :activeName="activeName" @success="getTemplates"/>
    <el-tabs v-model="activeName">
      <el-tab-pane name="preset">
        <span slot="label">预置模板 </span>
        <el-tooltip placement="top" slot="label" effect="light">
          <div slot="content" style="width:200px">预置模板无需编辑，可直接进行调用或训练自定义分类器，如需更多预置模板可点击“添加更多”进行勾选发布，各模板详细介绍可参考技术文档</div>
          <i class="el-icon-question"></i>
        </el-tooltip>
        <ocr-table :columns="presetColumns" :data="presetData" :page="presetPage" @page-change="getTemplates('preset')"></ocr-table>
      </el-tab-pane>
      <el-tab-pane label="自定义模板" name="custom">
        <ocr-table :columns="customColumns" :data="customData" :page="customPage" @page-change="getTemplates('custom')"></ocr-table>
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
      presetData:[],
      customData:[],
      customPage:{
        total:0,
        size:20,
        index:1
      },
      presetPage:{
        total:0,
        size:20,
        index:1
      }
    };
  },
  mounted(){
    this.setColumns()
    this.getTemplates('custom')
    this.getTemplates('preset')
  },
  methods: {
    getTemplates(type){
      let isCustom = type === 'custom'
      let pageObjectName = isCustom ? 'customPage' : 'presetPage'
      let dataName = isCustom ? 'customData' : 'presetData'
      let postData = {
        preset:!isCustom,
        pageNum:this[pageObjectName].index,
        pageSize:this[pageObjectName].size
      }
      this.$globalRequest(this.$apis.template.getTemplates(postData)).then(data=>{
        this[dataName] = data.data.list
        this[pageObjectName].total = data.data.totalRecord
      })
    },
    setColumns(){
      let columns = [{
        title:"模板名称",
        key:"templateName"
      },{
        title:"模板图片",
        key:"imageUrl",
        format:(row)=>{
          return <ImagePreviewCell src={row.imageUrl} />
        }
      },{
        title:"模板ID（templateSign）",
        width: 350,
        key:"templateId",
        format:(row)=>{
          return <CopyCell content={row.templateId} message="模板ID已经复制到剪贴板"/>
        }
      },{
        title:"发布时间",
        key:"deployTime",
        headerFormat:({row})=>{
          return <div>发布时间 <i class="el-icon-files"></i></div>
        },
        format:(row)=>{
          return row.deployTime ? parseTime(row.deployTime) : '--'
        }
      },{
        title:"修改时间",
        key:"modifyTime",
        format:(row)=>{
          return parseTime(row.modifyTime)
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
            <el-button type="text" on-click={()=>this.onTry(row)} disabled={!row.deploy}>试一试</el-button>
            <el-button type="text" on-click={()=>this.onDelete(row, 'preset')}>删除</el-button>
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
            <el-button type="text" on-click={()=>this.onTry(row)} disabled={!row.deploy}>试一试</el-button>
            <el-button type="text" on-click={()=>this.onEdit(row)}>编辑</el-button>
            <el-button type="text" on-click={()=>this.onDelete(row, 'custom')}>删除</el-button>
          </div>
        }
      })
      this.presetColumns = presetColumns
      this.customColumns = customColumns
    },
    onDelete(row, type){
      this.$confirm(`是否确认模板 ${row.templateName}，删除后不可恢复`, '确认', {type:'warning'}).then(()=>{
        this.$globalRequest(this.$apis.template.deleteTemplate({templateId:row.templateId})).then(data=>{
          this.getTemplates(type)
        })
      })
    },
    onEdit(row) {
      this.$router.push({
        path:'/template-editor',
        query:{
          templateId:row.templateId
        }
      })
    },
    onTry(row){
      this.$refs.tryDialog.show(row)
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