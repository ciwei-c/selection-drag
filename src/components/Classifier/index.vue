<template>
  <div class="ocr-classifier">
    <table-action :activeName="activeName" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="分类器管理" name="classifier">
        <ocr-table :columns="classifierColumns" :data="classifierData"></ocr-table>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import TableAction from "@/components/Classifier/TableAction"
import StatusCell from "@/components/Common/StatusCell"
import {parseTime} from "@/utils"
export default {
  components:{TableAction, StatusCell},
  data() {
    return {
      activeName: "classifier",
      classifierColumns:[],
      classifierData:[{}]
    };
  },
  mounted(){
    this.setColumns()
    this.setFakeData()
  },
  methods: {
    setFakeData(){
      let data = [{
        classifierName:'qq',
        classifierImage:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        classifierId:'1',
        createTime:'2020-11-17 10:16:22',
        templateCount:'1'
      },{
        classifierName:'qq',
        classifierImage:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        classifierId:'2',
        createTime:'2020-11-17 10:16:22',
        templateCount:'2'
      }]
      this.presetData = data
      this.classifierData = data
    },
    setColumns(){
      let columns = [{
        title:"分类器名称",
        key:"classifierName"
      },{
        title:"分类器ID",
        key:"classifierId",
        format:(row)=>{
          return row.classifierId
        }
      },{
        title:"训练状态",
        key:"classifierId",
        format:(row)=>{
          return <StatusCell />
        }
      },{
        title:"发布时间",
        key:"createTime",
        format:(row)=>{
          return parseTime(row.createTime)
        }
      },{
        title:"包含模板数量",
        key:"templateCount",
        format:(row)=>{
          return row.templateCount
        }
      },{
        title:"预估准确率",
        key:"rate",
        format:(row)=>{
          return "--"
        }
      },
      {
        title:"操作",
        key:"action",
        format:(row)=>{
          return <div>
            <el-button type="text">测试</el-button>
            <el-button type="text" on-click={()=>this.onEdit()}>编辑</el-button>
            <el-button type="text">删除</el-button>
            <el-button type="text">发布</el-button>
          </div>
        }
      }
      ]
      this.classifierColumns = columns
    },
    onEdit() {
      this.$router.push({
        path:'/classifier-editor'
      })
    },
  },
};
</script>

<style lang="scss" >
.ocr-classifier {
  padding: 20px;
  position: relative;
}
</style>