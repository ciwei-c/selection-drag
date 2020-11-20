<template>
  <div class="ocr-classifier-editor">
    <div class="ocr-classifier-editor__header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/classifier' }">分类器管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑分类器</el-breadcrumb-item>
      </el-breadcrumb>
    </div> 
    <div class="ocr-classifier-editor__body">
      <div class="ocr-classifier-editor__panel">
        <div class="ocr-classifier-editor__panel-title">基本信息</div>
        <div class="ocr-classifier-editor__panel-item">
          <label>分类器名称:</label>
          <div v-if="editing" style="display:flex;align-items: center;">
            <el-input></el-input>
            <el-button style="margin-left:10px" type="text" @click="editing = false">确定</el-button>
            <el-button type="text" @click="editing = false">取消</el-button>
          </div>
          <div v-else style="display:flex;align-items: center;">
            <div>qq</div>
            <el-button type="text" @click="editing = true" style="transform:translate(5px, 3px)">修改</el-button>
          </div>
        </div>
        <div class="ocr-classifier-editor__panel-item">
          <label>分类器ID:</label>
          <div>22</div>
        </div>
        <div class="ocr-classifier-editor__panel-item">
          <label>包含模板数:</label>
          <div>11</div>
        </div>
        <div class="ocr-classifier-editor__panel-item">
          <label>状态:</label>
          <div><status-cell /></div>
        </div>
      </div>
      <div class="ocr-classifier-editor__panel">
        <div class="ocr-classifier-editor__panel-title">添加模板</div>
        <template-table />
      </div>
    </div>
  </div>
</template>

<script>
import StatusCell from "@/components/Common/StatusCell"
import TemplateTable from "./TemplateTable"
export default {
  components:{StatusCell, TemplateTable},
  data(){
    return {
      editing:false
    }
  },
  methods:{
    
  }
}
</script>

<style lang="scss" >
@import "@/styles/color";
.ocr-classifier-editor {
  .el-breadcrumb__inner.is-link, .el-breadcrumb__inner a {
    color: $--color-primary;
    font-weight: normal;
  }
  height: 100%;
  &__header {
    height: 60px;
    position: relative;
    z-index: 1;
    display: flex;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.15);
    background: #fff;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
  }
  &__body {
    height: calc(100% - 60px);
  }
  &__panel {
    margin: 10px 20px 20px 50px;
    padding-bottom: 30px;
    &-title {
      font-size: 16px;
      color: #000;
      border-left: 4px solid $--color-primary;
      padding-left: 10px;
    }
    &-item {
      display: flex;
      align-items: center;
      font-size: 13px;
      margin-top: 18px;
      > label {
        color: $--color-info;
        min-width: 95px;
        text-align: left;
      }
    }
    border-bottom: 1px solid #e9e8f0;
  }
}
</style>