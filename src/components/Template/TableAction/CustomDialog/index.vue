<template>
  <ocr-dialog
    :visible.sync="visible"
    :title="title"
    append-to-body
    :confirmText="confirmText"
    :cancel="cancel"
    width="700px"
    @confirm="onConfirm"
  >
    <div v-if="step === 1" class="ocr-common--tc">
      <el-upload
        @on-success="onSuccess"
        @before-upload="beforeUpload"
        :show-file-list="false"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
        <img
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          alt=""
        />
        <div><i class="el-icon-refresh"></i> 重新上传</div>
      </div>
    </el-form>
  </ocr-dialog>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      title: "上传模板图片",
      confirmText: "下一步",
      cancel: false,
      visible: false,
      step: 1,
    };
  },
  watch: {
    visible(v) {
      if (!v) {
        this.model = {};
        this.step = 1;
        if (this.$refs.form) {
          this.$refs.form.resetFields();
        }
      }
    },
    step: {
      immediate: true,
      handler(v) {
        if (v === 1) {
          this.confirmText = "下一步";
          this.title = "上传模板图片";
          this.cancel = false;
        } else {
        }
      },
    },
  },
  methods: {
    onSuccess(file) {
      console.log(file);
    },
    beforeUpload(file) {
      console.log(file);
    },
    show() {
      this.visible = true;
    },
    onConfirm() {
      if (this.step === 1) {
        this.step++;
      } else {
        this.visible = false
      }
    },
  },
};
</script>

<style lang="scss">
.ocr-template__custom-dialog-img {
  margin-top: 10px;
  img {
    max-height: 300px;
    display: block;
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
    transition: all .3s;
  }
  &:hover {
    > div {
      opacity: 1;
    }
  }
}
</style>