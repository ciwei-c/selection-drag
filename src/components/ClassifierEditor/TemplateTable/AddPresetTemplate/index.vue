<template>
  <span style="margin-right:10px">
    <el-button @click="onAdd">添加预置模板</el-button>
    <ocr-dialog :visible.sync="visible" title="添加预置模板" width="600px" @confirm="onConfirm">
      <div style="transform:translateY(-15px)">
        <el-input placeholder="请输入模板名称进行搜索" v-model="search"></el-input>
      </div>
      <div class="ocr-classifier__preset-template-panel">
        <div class="ocr-classifier__preset-template-panel__title">
          预置模板
        </div>
        <div class="ocr-classifier__preset-template-panel__body">
          <div class="ocr-classifier__preset-templates">
            <div v-for="(presetTemplate, idx) in presetTemplates" :key="idx">
              <el-checkbox :label="presetTemplate.label"></el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="ocr-classifier__preset-template-panel">
        <div class="ocr-classifier__preset-template-panel__title">
          更多模板
          <div class="ocr-classifier__preset-template-panel__subtitle">
            (发布后可用)
          </div>
        </div>
        <div class="ocr-classifier__preset-template-panel__body">
          <div class="ocr-classifier__preset-templates">
            <div v-for="(presetTemplate, idx) in presetTemplates" :key="idx">
              <div>{{presetTemplate.label}}</div>
              <el-button type="text" style="margin-left:10px;transform: translateY(1px);">发布</el-button>
            </div>
          </div>
        </div>
      </div>
    </ocr-dialog>
  </span>
</template>

<script>
export default {
  data(){
    return {
      search:'',
      visible:false,
      presetTemplates:[{
        label:"大陆身份证正面"
      },{
        label:"大陆身份证背面"
      },{
        label:"银行卡"
      },{
        label:"行驶证正页"
      },{
        label:"行驶证副页"
      },{
        label:"驾驶证"
      },{
        label:"营业执照"
      }],
      moreTemplates:[]
    }
  },
  methods:{
    onAdd(){
      this.visible = true
    },
    onConfirm(){
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/color";
.ocr-classifier__preset-templates {
  width: 100%;
  overflow: hidden;
  padding: 20px;
  padding-bottom: 0;
  > div {
    width: 33.33%;
    float: left;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
}
.ocr-classifier__preset-template-panel {
  &__subtitle {
    font-size: 12px;
    color: $--color-info;
  }
  &__title {
    padding-left: 10px;
    font-size: 14px;
    position: relative;
    display: flex;
    align-items: center;
    &::before {
      position: absolute;
      content: " ";
      left: 0;
      width: 3px;
      height: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: #000;
    }
  }
  &__body {
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #f7f7f7;
  }
}
</style>