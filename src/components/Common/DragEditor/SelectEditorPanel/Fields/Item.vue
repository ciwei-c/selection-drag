<template>
  <div
    class="ocr-select-editor__panel-field"
    @mouseenter="$emit('mouseenter', index)"
    @mouseleave="$emit('mouseleave', index)"
  >
    <div class="ocr-select-editor__panel-field-title">
      参照字段{{ index + 1 }}
      <i class="el-icon-close" @click="() => $emit('close', index)"></i>
    </div>
    <div>
      <el-input placeholder="识别内容为空" v-model="item.identificationResult"></el-input>
    </div>
    <div class="ocr-select-editor__panel-field-tip ocr-select-editor__panel-field--error" v-if="!item.identificationResult">
      框选区内未识别到内容，请修改或重新选区
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
  },
};
</script>

<style>
</style>