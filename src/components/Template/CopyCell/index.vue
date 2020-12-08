<template>
  <div class="ocr-template__copy-cell">
    <div v-if="showContent">
      {{content}}
    </div>
    <el-tooltip class="item" effect="dark" content="复制" placement="top">
      <i class="el-icon-copy-document" @click="copyContent"></i>
    </el-tooltip>
    <input
      ref="input"
      type="text"
      style="position: absolute; top: 0; left: 0; opacity: 0; z-index: -10"
    />
  </div>
</template>

<script>
export default {
  props:{
    content:String,
    showContent:{
      type:Boolean,
      default:true
    },
    message:String
  },
  methods: {
    copyContent(ElementObj) {
      var inputElement = this.$refs.input;
      inputElement.value = this.content;
      inputElement.select();
      document.execCommand("Copy");
      inputElement.value = ""
      this.$message.success(this.message)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/color";
.ocr-template__copy-cell {
  display: flex;
  align-items: center;
  > div {
    max-width: 330px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  i {
    margin-left: 10px;
    cursor: pointer;
    color: $--color-primary;
  }
}
</style>