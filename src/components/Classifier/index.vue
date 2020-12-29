<template>
  <div class="ocr-classifier">
    <table-action :activeName="activeName" :parent="parent"/>
    <el-tabs v-model="activeName">
      <el-tab-pane label="分类器管理" name="classifier">
        <ocr-table :columns="classifierColumns" :data="classifierData" :page="page" @page-change="getClassifiers"></ocr-table>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import TableAction from "@/components/Classifier/TableAction"
import StatusCell from "@/components/Common/StatusCell"
import {parseTime} from "@/utils"
import translateMixin from "@/mixins/translateMixin"
export default {
  mixins:[translateMixin],
  components:{TableAction, StatusCell},
  data() {
    return {
      activeName: "classifier",
      classifierColumns:[],
      classifierData:[],
      page:{
        total:0,
        size:20,
        index:1
      }
    };
  },
  computed:{
    parent(){
      return this
    }
  },
  mounted(){
    this.setColumns()
    this.getClassifiers()
  },
  methods: {
    getClassifiers(){
      this.$globalRequest(this.$apis.classifier.getClassifiers({
        pageNum:this.page.index,
        pageSize:this.page.size
      })).then(data=>{
        this.classifierData = data.data.list
        this.page.total = data.data.totalRecord
        this.translate = data.translate
      })
    },
    setColumns(){
      let columns = [{
        title:"分类器名称",
        key:"classifierName"
      },{
        title:"分类器ID",
        key:"classifierId",
        width:300,
        format:(row)=>{
          return row.classifierId
        }
      },{
        title:"训练状态",
        key:"trainingState",
        format:(row)=>{
          return <StatusCell type={row.trainingState} label={this.translateProp(row, 'trainingState')}/>
        }
      },{
        title:"发布时间",
        key:"createTime",
        format:(row)=>{
          return parseTime(row.createTime)
        }
      },{
        title:"包含模板数量",
        key:"templateNum",
        format:(row)=>{
          return row.templateNum
        }
      },{
        title:"预估准确率",
        key:"accuracy",
        format:(row)=>{
          return row.accuracy ||　"--"
        }
      },
      {
        title:"操作",
        key:"action",
        width:160,
        format:(row)=>{
          return <div>
            <el-button type="text">测试</el-button>
            <el-button type="text" on-click={()=>this.onEdit(row)}>编辑</el-button>
            <el-button type="text" on-click={()=>this.onDelete(row)}>删除</el-button>
            <el-button type="text">发布</el-button>
          </div>
        }
      }
      ]
      this.classifierColumns = columns
    },
    onDelete({classifierName, classifierId}){
      this.$confirm(`是否确认删除分类器 ${classifierName}, 删除后无法恢复`, {title:'确认', type:'warning'}).then(()=>{
        this.$globalRequest(this.$apis.classifier.deleteClassifier({classifierId})).then(()=>{
          this.$message.success("删除成功")
          this.getClassifiers()
        })
      })
    },
    onEdit({classifierId}) {
      this.$router.push({
        path:'/classifier-editor',
        query:{
          classifierId
        }
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