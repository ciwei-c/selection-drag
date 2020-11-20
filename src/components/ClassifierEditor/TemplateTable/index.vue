<template>
  <div class="ocr-classifier-editor__template">
    <div class="ocr-classifier-editor__template-btn">
      <el-button>添加预置模板</el-button>
      <el-button>添加自定义模板</el-button>
    </div>
    <ocr-table :columns="columns" :data="data"></ocr-table>
  </div>
</template>

<script>
export default {
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
          format: (row) => {
            return <el-button icon="el-icon-plus" type="text">请添加</el-button>;
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
          format: (row) => {
            return (
              <div>
                <el-button type="text">编辑训练集</el-button>
                <el-button type="text">清空关键字</el-button>
                <el-button type="text">删除</el-button>
              </div>
            );
          },
        },
      ],
    };
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