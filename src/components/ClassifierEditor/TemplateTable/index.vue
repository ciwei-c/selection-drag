<template>
  <div class="ocr-classifier-editor__template">
    <div class="ocr-classifier-editor__template-btn">
      <add-preset-template
        :addedTemplate="classifierTemplateData.map((v) => v.templateId)"
        @success="getClassifierTemplates"
      />
      <add-custom-template
        :addedTemplate="classifierTemplateData.map((v) => v.templateId)"
        @success="getClassifierTemplates"
      />
    </div>
    <ocr-table :columns="columns" :data="classifierTemplateData"></ocr-table>
    <training-dataset ref="training" />
  </div>
</template>

<script>
import AddKeyword from "./AddKeyword";
import AddPresetTemplate from "./AddPresetTemplate";
import AddCustomTemplate from "./AddCustomTemplate";
import TrainingDataset from "./TrainingDataset";
export default {
  components: {
    AddKeyword,
    AddPresetTemplate,
    AddCustomTemplate,
    TrainingDataset,
  },
  mounted() {
    this.classifierId = this.$route.query.classifierId;
    this.getClassifierTemplates();
  },
  data() {
    return {
      classifierTemplateData: [],
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
            return (
              <div>
                <span>分类关键词</span>
                <el-tooltip effect="light" placement="right">
                  <div slot="content">
                    图片中存在的独有的文字内容，用于匹
                    <br />
                    配版式相同的识别模板，请保证输入的
                    <br />
                    关键词仅在该模板中出现
                  </div>
                  <i
                    class="el-icon-question"
                    style="cursor:pointer;margin-left:10px"
                  ></i>
                </el-tooltip>
              </div>
            );
          },
          format: (row) => {
            return <AddKeyword />;
          },
        },
        {
          title: "训练集图片数量",
          key: "templateImageCount",
          headerFormat: (row) => {
            return (
              <div>
                <span>训练集图片数量</span>
                <el-tooltip effect="light" placement="right">
                  <div slot="content">
                    每个模板至少上传30张训练集图片，才
                    <br />
                    可训练模型
                  </div>
                  <i
                    class="el-icon-question"
                    style="cursor:pointer;margin-left:10px"
                  ></i>
                </el-tooltip>
              </div>
            );
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
          key: "accuracy",
          format: (row) => {
            return "--";
          },
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          format: (row) => {
            return (
              <div>
                <el-button type="text" on-click={() => this.onTraining(row)}>
                  编辑训练集
                </el-button>
                <el-button type="text">清空关键字</el-button>
                <el-button type="text" on-click={() => this.onDelete(row)}>
                  删除
                </el-button>
              </div>
            );
          },
        },
      ],
    };
  },
  methods: {
    onDelete({ templateId, classifierId, templateName }) {
      this.$confirm(`确认删除该分类器下模板 ${templateName}，删除后无法恢复`, {
        title: "确认",
        type: "warning",
      }).then(() => {
        this.$globalRequest(
          this.$apis.classifier.deleteClassifierTemplate({
            templateId,
            classifierId,
          })
        ).then(() => {
          this.$message.success("删除成功");
          this.getClassifierTemplates();
        });
      });
    },
    onTraining(row) {
      this.$refs.training.show(row);
    },
    getClassifierTemplates() {
      this.$globalRequest(
        this.$apis.classifier.getClassifierTemplates({
          classifierId: this.classifierId,
        })
      ).then((data) => {
        this.classifierTemplateData = data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ocr-classifier-editor__template {
  &-btn {
    margin: 10px 0;
  }
}
</style>