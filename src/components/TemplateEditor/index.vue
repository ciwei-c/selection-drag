<template>
  <div class="ocr-template-editor">
    <div class="ocr-template-editor__header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/template' }"
          >模板管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>编辑模板</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button>试一试</el-button>
        <el-button @click="onPublish">发布</el-button>
        <el-dropdown @command="handleCommand">
          <span
            class="el-dropdown-link"
            style="margin-left: 10px; cursor: pointer"
          >
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="change">更换模板图片</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="ocr-template-editor__body">
      <ocr-drag-editor :data="data" ref="dragEditor" />
    </div>
  </div>
</template>

<script>
import OcrDragEditor from "@/components/Common/DragEditor";
import { deepClone } from "@/utils";
export default {
  components: {
    OcrDragEditor,
  },
  data() {
    return {
      data: {},
    };
  },
  mounted() {
    if (!this.$route.query.templateId) {
      setTimeout(() => {
        this.$router.push({
          path:'/template'
        })
      }, 1000);
      return this.$message.error("模板不存在");
    }
    this.templateId = this.$route.query.templateId;
    this.getTemplateById();
  },
  methods: {
    onPublish(){
      this.$globalRequest(this.$apis.template.publishTemplate({templateId:this.data.templateId})).then(
        () => {
          this.$message.success("发布成功")
        }
      );
    },
    onSave() {
      let data = this.$refs.dragEditor.getDefinitionData();
      if (!data) return;
      let postData = deepClone(this.data);
      const getPostData = (v, data) => {
        return Object.assign({
          templateId: postData.templateId,
          templateKey: postData.templateKey,
          templateVersion: postData.templateVersion,
          location: JSON.stringify({
            sx: v.startClientX,
            ex: v.endClientX,
            sy: v.startClientY,
            ey: v.endClientY,
          })
        },data)
      }
      postData.templateBenchmarks = data.fields.map((v) => {
        return getPostData(v, {markName:v.identificationResult})
      });
      postData.templateIdentifications = data.zones.map((v) => {
        return getPostData(v, {
          field:v.field,
          identificationName: v.fieldName,
          identificationResult: v.identificationResult
        })
      });
      this.$globalRequest(this.$apis.template.updateTemplate(postData)).then(
        () => {
          this.$message.success("保存成功")
        }
      );
    },
    getTemplateById() {
      this.$globalRequest(
        this.$apis.template.getTemplateById({
          templateId: this.templateId,
        })
      ).then((data) => {
        this.data = data.data;
      });
    },
    handleCommand(v) {
      this.$confirm(
        "更新模板图片不会更新模板ID，将会清除此模板下的全部历史版本记录，要继续更新模板图片吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" >
@import "@/styles/color";
.ocr-template-editor {
  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a {
    color: $--color-primary;
    font-weight: normal;
  }
  height: 100%;
  &__header {
    height: 60px;
    position: relative;
    z-index: 1;
    display: flex;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
    background: #fff;
    align-items: center;
    padding: 0 30px;
    justify-content: space-between;
  }
  &__body {
    height: calc(100% - 60px);
  }
}
</style>