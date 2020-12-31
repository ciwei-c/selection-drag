<template>
  <div>
    {{ keyWordValue }}
    <el-popover
      placement="bottom-start"
      width="300"
      trigger="click"
      :value="false"
      ref="popover"
    >
      <div>
        <div style="margin-bottom: 10px; font-size: 12px">修改关键字</div>
        <el-form :model="model" ref="form">
          <el-form-item
            prop="keyWord"
            :rules="[{ validator: (field, value, cb) => {
              if(value && value.split(',').length > 5){
                return cb('最多填写5个关键词，并使用逗号分隔')
              }
              cb()
            } }]"
          >
            <el-input
              v-model="model.keyWord"
              size="mini"
              placeholder="最多填写5个关键词，并使用逗号分隔"
            ></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: right; margin-top: 10px">
          <el-button size="mini" @click="doClose">取消</el-button>
          <el-button size="mini" type="primary" @click="onConfirm"
            >确定</el-button
          >
        </div>
      </div>
      <el-button
        slot="reference"
        icon="el-icon-plus"
        type="text"
        v-if="!keyWordValue"
        >请添加</el-button
      >
      <el-button
        v-else
        slot="reference"
        icon="el-icon-edit"
        type="text"
      ></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    keyWord: String,
    row: Object,
  },
  data() {
    return {
      model: {},
      keyWordValue: "",
    };
  },
  watch: {
    keyWord() {
      this.keyWordValue = this.keyWord;
    },
  },
  mounted() {
    this.keyWordValue = this.keyWord;
  },
  methods: {
    onConfirm() {
      this.$refs.form.validate((ok)=>{
        if(ok){
          this.$globalRequest(
            this.$apis.classifier.updateClassifierTemplate(
              Object.assign(this.row, {
                keyWord: this.model.keyWord || "",
              })
            )
          ).then(() => {
            this.$emit("success");
            this.doClose();
          });
        }
      })
    },
    doClose() {
      this.$refs.form.resetFields()
      this.$refs.popover.doClose();
    },
  },
};
</script>

<style>
</style>