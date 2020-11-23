<template>
  <div class="ocr-classifier-editor__template">
    <div class="ocr-classifier-editor__template-btn">
      <add-preset-template />
      <add-custom-template />
    </div>
    <ocr-table :columns="columns" :data="data"></ocr-table>
    <training-dataset ref="training" />
  </div>
</template>

<script>
import AddKeyword from "./AddKeyword"
import AddPresetTemplate from "./AddPresetTemplate"
import AddCustomTemplate from "./AddCustomTemplate"
import TrainingDataset from "./TrainingDataset"
export default {
  components:{AddKeyword, AddPresetTemplate, AddCustomTemplate, TrainingDataset},
  data() {
    return {
      data: [
        {
          templateName: "大陆身份证正面新品",
          templateImage:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          templateId: "e995fd458226de8b0e955e53fdf9a0192020",
          createTime: "2020-11-17 10:16:22",
          modifiyTime: "2020-11-17 10:16:22",
        },
        {
          templateName: "大陆身份证正面新品",
          templateImage:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          templateId: "e995fd458226de8b0e955e53fdf9a0192020",
          createTime: "2020-11-17 10:16:22",
          modifiyTime: "2020-11-17 10:16:22",
        },
      ],
      columns: [
        {
          title: "模板名称",
          key: "templateName",
        },
        {
          title: "模板ID（templateSign）",
          key: "templateId",
          format: (row) => {
            return row.templateId;
          },
        },
        {
          title: "分类关键词",
          key: "templateId",
          headerFormat: (row) => {
            return <div>
                <span>分类关键词</span> 
                <el-tooltip effect="light" placement="right">
                  <div slot="content">图片中存在的独有的文字内容，用于匹<br/>配版式相同的识别模板，请保证输入的<br/>关键词仅在该模板中出现</div>
                  <i class="el-icon-question" style="cursor:pointer;margin-left:10px"></i>
                </el-tooltip>
              </div>
          },
          format: (row) => {
            return <AddKeyword />;
          },
        },
        {
          title: "训练集图片数量",
          key: "templateImageCount",
          headerFormat: (row) => {
            return <div>
                <span>训练集图片数量</span> 
                <el-tooltip effect="light" placement="right">
                  <div slot="content">每个模板至少上传30张训练集图片，才<br/>可训练模型</div>
                  <i class="el-icon-question" style="cursor:pointer;margin-left:10px"></i>
                </el-tooltip>
              </div>
          },
          format: (row) => {
            return "--";
          },
        },
        {
          title: "训练集状态",
          key: "templateId",
          format: (row) => {
            return "未上传";
          },
        },
        {
          title: "预估准确率",
          key: "templateId",
          format: (row) => {
            return "--";
          },
        },
        {
          title: "操作",
          key: "action",
          width:200,
          format: (row) => {
            return (
              <div>
                <el-button type="text" on-click={()=>this.onTraining(row)}>编辑训练集</el-button>
                <el-button type="text">清空关键字</el-button>
                <el-button type="text">删除</el-button>
              </div>
            );
          },
        },
      ],
    };
  },
  methods:{
    onTraining(row){
      this.$refs.training.show(row)
    }
  }
};
</script>
<style lang="scss" scoped>
.ocr-classifier-editor__template {
  &-btn {
    margin: 10px 0;
  }
}
</style>