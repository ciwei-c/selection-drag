<template>
  <ocr-dialog
    :visible.sync="visible"
    title="创建分类器"
    append-to-body
    width="520px"
    @confirm="onConfirm"
  >
    <el-form :model="model" ref="form" label-width="100px">
      <el-form-item
        label="分类器名称"
        prop="classifierName"
        :rules="[{ required: true, message: '不能为空' }]"
      >
        <el-input
          v-model="model.classifierName"
          placeholder="请输入名称，最长20个字"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="功能描述"
        prop="classifierFunction"
        :rules="[{ required: true, message: '不能为空' }]"
      >
        <el-input
          type="textarea"
          v-model="model.classifierFunction"
          placeholder="请简要描述产品功能，最长200个字"
          resize="none"
          :rows="4"
        ></el-input>
      </el-form-item>
    </el-form>
  </ocr-dialog>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      visible: false,
    };
  },
  watch: {
    visible(v) {
      if (!v) {
        this.model = {};
        this.$refs.form.resetFields();
      }
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    onConfirm() {},
  },
};
</script>

<style lang="scss">
</style>