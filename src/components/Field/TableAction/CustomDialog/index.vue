<template>
  <ocr-dialog
    :visible.sync="visible"
    title="创建字段类型"
    append-to-body
    width="600px"
    @confirm="onConfirm"
  >
    <el-form :model="model" ref="form" label-width="100px">
      <el-form-item
        label="字段类型"
        prop="fieldName"
        :rules="[{ required: true, message: '不能为空' }]"
      >
        <el-input
          v-model="model.fieldName"
          placeholder="请输入名称，最长20个字"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="词典内容"
        prop="fieldList"
        :rules="[{ required: true, message: '不能为空' }]"
      >
        <el-input
          type="textarea"
          v-model="model.fieldList"
          placeholder="请输入词典内容，每个字段值换行分割，如：
北京市
天津市
上海市
重庆市
空行和重复字段会被自动忽略"
          resize="none"
          :rows="10"
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
    show(row) {
      this.isAdd = true
      if(row) this.isAdd = false
      this.model = Object.assign({}, row)
      this.visible = true;
    },
    onConfirm() {
      this.$refs.form.validate((ok) => {
        if (ok) {
          let fn = this.isAdd ? 'addField' : 'updateField'
          this.$globalRequest(this.$apis.field[fn](Object.assign(this.model, {
            custom:true
          }))).then(
            () => {
              this.$message.success(`${this.isAdd ? '创建' : '修改'}字段类型成功`);
              this.$emit("success");
              this.visible = false;
            }
          );
        }
      });
    },
  },
};
</script>

<style lang="scss">
</style>