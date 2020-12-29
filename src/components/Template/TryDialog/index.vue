<template>
  <ocr-dialog
    :visible.sync="visible"
    class="ocr-template__try-dialog"
    title="试一试"
    width="1000px"
  >
    <div class="ocr-template__try-dialog-body">
      <div class="ocr-template__try-dialog-body__image">
        <img :src="imageUrl" alt="" v-if="imageUrl" />

        <el-upload
          v-if="imageUrl"
          :on-change="onChange"
          :auto-upload="false"
          :show-file-list="false"
          :action="action"
        >
          <div
            class="ocr-template__try-dialog-body__image-choose"
            v-if="imageUrl"
          >
            <i class="el-icon-refresh"></i>
            <div>重新选择图片</div>
          </div>
        </el-upload>
        <el-upload
          v-else
          :on-change="onChange"
          :auto-upload="false"
          :show-file-list="false"
          drag
          :action="action"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件(不大于4M)拖到此处，或<em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <div class="ocr-template__try-dialog-body__ret">
        <el-tabs v-model="activeName">
          <el-tab-pane label="识别结果" name="result">
            <el-row>
              <div>{{ result }}</div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="JSON" name="json">
            <json-pre :json="{}"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </ocr-dialog>
</template>

<script>
import JsonPre from "@/components/Common/JsonPre";
import uploadMixin from "../uploadMixin";
export default {
  mixins: [uploadMixin],
  components: { JsonPre },
  watch: {
    imageUrl(v) {
      this.$globalRequest(
        this.$apis.template.templateIdentify({
          imageBase64: v,
          templateId: this.row.templateId,
        }).then((data)=>{
          this.result = data.data.result
        })
      );
    },
  },
  data() {
    return {
      visible: false,
      jsonVisible: false,
      result: "",
      activeName: "result",
    };
  },
  methods: {
    show(row) {
      this.visible = true;
      this.row = row;
    },
    onChange(file) {
      if(this.isOversize(file.raw)) return
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        console.log(reader.result);
        this.imageUrl = reader.result;
      };
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/color";
.ocr-template__try-dialog-body {
  display: flex;
  border: 1px solid #f2f2f2;
  > div {
    width: 50%;
  }
  &__image {
    position: relative;
    background: #f6f7fb;
    height: 460px;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      .ocr-template__try-dialog-body__image-choose {
        opacity: 1;
      }
    }
    &-choose {
      opacity: 0;
      transition: all 0.3s;
      position: absolute;
      width: 100%;
      height: 40px;
      bottom: 0;
      left: 0;
      font-size: 14px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: rgba(#000000, $alpha: 0.5);
      i {
        margin-right: 10px;
      }
    }
    img {
      width: 100%;
    }
    .el-upload-dragger {
      background: transparent;
      border: none;
    }
    .el-upload__text {
      color: $--color-info;
      font-size: 12px;
      margin-top: 10px;
    }
  }
  &__ret {
    .el-tabs__nav-wrap::after {
      height: 1px;
      background-color: #f2f2f2;
    }
    .el-tabs__item {
      padding-left: 20px !important;
    }
    .el-tab-pane {
      padding: 0 20px;
      height: 406px;
      overflow: auto;
    }
  }
}
</style>