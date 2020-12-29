<template>
  <ocr-dialog :visible.sync="visible" title="编辑训练集" width="460px" @confirm="onConfirm">
    <div>
      <span>{{row.templateName}}</span>
      <span style="font-size:12px;color:#999">（请上传至少30张同一模板图片的压缩包）</span>
    </div>
    <div>
      <el-upload
        ref="upload"
        style="text-align:center"
        :action="action"
        :on-change="onChange"
        :on-success="onSuccess"
        accept="application/zip"
        :auto-upload="false"
        :show-file-list="false"
        :data="data"
      >
        <div class="ocr-classifier__train-upload" v-if="!file.uid">
          <i class="el-icon-upload2"></i>
          <div>上传压缩包</div>
        </div>
        <div v-else>
          <div style="margin:20px 0">
            <img src="@/assets/icon/zip.png" style="width:100px;" alt="">
            <div class="ocr-classifier__train-upload-filename" style="margin-bottom:10px 0">{{file.name}}</div>
          </div>
          <div>重新选择</div>
        </div>
        <div slot="tip" style="font-size:12px;color:#999">上传不超过200MB，ZIP格式压缩包</div>
      </el-upload>
    </div>
  </ocr-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      fileUid: "",
      file:{},
      fileName: "",
      data:{},
      row:{}
    };
  },
  computed:{
    action(){
      return '/classifier/template/training-collection'
    }
  },
  methods: {
    onChange(file){
      this.$refs.upload.uploadFiles = this.$refs.upload.uploadFiles.filter(v=>{
        if(v.uid === this.file.uid) return false
        return true
      })
      this.file = file
    },
    show(row) {
      this.row = Object.assign({}, row)
      this.data = {
        classifierId:row.classifierId,
        templateId:row.templateId
      }
      this.visible = true;
    },
    onConfirm(){
      if(!this.file.uid) {
        return this.$message.error("请上传文件")
      }
      this.$refs.upload.submit()
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/color";
.ocr-classifier__train-upload {
  text-align: center;
  background: rgba($--color-primary, 0.2);
  color: $--color-primary;
  padding: 30px 50px;
  margin: 20px 0 10px 0;
  i {
    font-size: 20px;
    margin-bottom: 10px;
  }
  &-filename {
    color: $--color-info !important;
  }
}
</style>