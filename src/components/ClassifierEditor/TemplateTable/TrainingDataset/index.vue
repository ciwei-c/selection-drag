<template>
  <ocr-dialog :visible.sync="visible" title="编辑训练集" width="460px">
    <div>
      <span>模板名称</span>
      <span style="font-size:12px;color:#999">（请上传至少30张同一模板图片的压缩包）</span>
    </div>
    <div>
      <el-upload
        style="text-align:center"
        action="https://jsonplaceholder.typicode.com/posts/"
        accept="application/zip"
        :limit="1"
      >
        <div class="ocr-classifier__train-upload">
          <i class="el-icon-upload2"></i>
          <div>上传压缩包</div>
        </div>
        <div slot="tip" style="font-size:12px;color:#999">上传不超过200MB，ZIP格式压缩包</div>
      </el-upload>
    </div>
  </ocr-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show(row) {
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/color";
.ocr-classifier__train-upload {
  text-align: center;
  background: rgba($--color-primary, 0.2);
  color: $--color-primary;
  padding: 30px 50px;
  margin: 20px 0 10px 0;
  i {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>