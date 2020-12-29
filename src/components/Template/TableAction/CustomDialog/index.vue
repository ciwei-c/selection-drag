<template>
  <ocr-dialog
    :visible.sync="visible"
    :title="title"
    append-to-body
    :buttonVisible="!!imageUrl"
    :confirmText="confirmText"
    :cancel="false"
    width="700px"
    @confirm="onConfirm"
  >
    <div v-if="!imageUrl" class="ocr-common--tc">
      <el-upload
        :on-success="onSuccess"
        :before-upload="beforeUpload"
        :show-file-list="false"
        drag
        :action="action"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件(不大于4M)拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>
    </div>
    <el-form :model="model" v-else ref="form" inline>
      <el-form-item
        label="模板名称"
        prop="templateName"
        :rules="[{ required: true, message: '不能为空' }]"
      >
        <el-input v-model="model.templateName"></el-input>
      </el-form-item>
      <div
        class="ocr-common--tc ocr-template__custom-dialog-img"
        style="background: #f6f7fb; position: relative"
      >
        <img :src="imageUrl" alt="" />
        <el-upload
          :on-success="onSuccess"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :action="action"
        >
          <div><i class="el-icon-refresh"></i> 重新上传</div>
        </el-upload>
      </div>
    </el-form>
  </ocr-dialog>
</template>

<script>
import uploadMixin from "../../uploadMixin"
export default {
  mixins:[uploadMixin],
  data() {
    return {
      model: {},
      title: "上传模板图片",
      confirmText: "下一步",
      visible: false,
    };
  },
  watch: {
    visible(v) {
      if (!v) {
        this.model = {};
        this.imageUrl = "";
        this.imageId = "";
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
      }
    },
    step: {
      immediate: true,
      handler(v) {},
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    onConfirm() {
      this.$refs.form.validate((ok) => {
        if (ok) {
          this.$globalRequest(
            this.$apis.template.addTemplate({
              imageId: this.imageId,
              preset: false,
              templateName: this.model.templateName,
            })
          ).then((data) => {
            this.visible = false;
            this.$emit("success");
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.ocr-template__custom-dialog-img {
  margin-top: 10px;
  img {
    display: block;
    width: 100%;
    margin: auto;
  }
  > div {
    position: absolute;
    height: 40px;
    color: #fff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background: rgba(#000000, 0.5);
    opacity: 0;
    transition: all 0.3s;
  }
  &:hover {
    > div {
      opacity: 1;
    }
  }
}
</style>