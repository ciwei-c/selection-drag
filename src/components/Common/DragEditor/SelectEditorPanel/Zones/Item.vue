<template>
  <div
    class="ocr-select-editor__panel-zone"
    @mouseenter="$emit('mouseenter', index)"
    @mouseleave="$emit('mouseleave', index)"
  >
    <template v-if="item.type !== 'insertTable'">
      <div class="ocr-select-editor__panel-zone-title">
        <i class="el-icon-close" @click="$emit('close', index)"></i>
      </div>
      <div class="ocr-select-editor__panel-zone-field-name">
        <span>字段名称</span>
        <el-input
          style="width: 100%"
          v-model="item.fieldName"
          placeholder="此处最多输入20个字符（中/英）"
        ></el-input>
      </div>
      <div class="ocr-select-editor__panel-zone-field-type">
        <span>字段类型</span>
        <el-select v-model="item.fieldType" style="width: 100%">
          <el-option
            v-for="(type, idx) in types"
            :key="idx"
            :label="type.label"
            :value="type.label"
          ></el-option>
        </el-select>
      </div>
      <div class="ocr-select-editor__panel-zone-ret">
        <span>识别结果</span>
        <div style="width: 100%">识别结果</div>
      </div>
      <div class="ocr-select-editor__panel-zone-tip">识别字段名称不能为空</div>
    </template>
    <template v-else>
      <div class="ocr-select-editor__panel-zone-title">
        <i class="el-icon-close" @click="$emit('close', index)"></i>
      </div>
      <div class="ocr-select-editor__panel-zone-table-name" style="border-bottom:1px solid #f2f2f2;padding-bottom:10px">
        <span>表格名</span>
        <el-input
          style="width: 100%"
          v-model="item.tableName"
          placeholder="请输入名称，最多20个字"
        ></el-input>
      </div>
      <div class="ocr-select-editor__panel-zone-column" v-for="(column, idx) in item.columns" :key="idx">
        <span>第 {{idx + 1}} 列：</span>
        <div>
          <el-input placeholder="列名称，最多20个字" style="margin-bottom:10px">
            <template slot="append">
              <span style="width:42px;display:inline-block">W{{parseInt(column.width)}}</span>
            </template>
          </el-input>
          <el-select v-model="item.fieldType" style="width: 100%;margin-bottom:10px">
            <el-option
              v-for="(type, innerIdx) in types"
              :key="innerIdx"
              :label="type.label"
              :value="type.label"
            ></el-option>
          </el-select>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number,
  },
  mounted(){
    this.$set(this.item, 'fieldType', "常规")
  },
  data() {
    return {
      types: [
        {
          label: "常规",
        },
        {
          label: "小写数字金额",
        },
        {
          label: "纯数字",
        },
        {
          label: "日期",
        },
        {
          label: "长串数字",
        },
        {
          label: "手写汉字",
        },
        {
          label: "手写数字",
        },
        {
          label: "数字/英文/符号混合",
        },
        {
          label: "勾选框",
        },
        {
          label: "标准印刷体",
        },
      ],
    };
  },
};
</script>

<style>
</style>