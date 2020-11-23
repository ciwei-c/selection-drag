<template>
  <ocr-dialog
    :visible.sync="visible"
    class="ocr-template__try-dialog"
    title="试一试"
    width="1000px"
  >
    <div class="ocr-template__try-dialog-body">
      <div class="ocr-template__try-dialog-body__image">
        <!-- <el-upload
          :show-file-list="false"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
        >
          <i class="el-icon-upload"></i>
          <div>
            <el-button type="primary">点击上传图片</el-button>
          </div>
          <div class="el-upload__text">图片大小不超过4M，最长边不超过4096像素</div>
        </el-upload> -->
        <img
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          alt=""
        />
        <div class="ocr-template__try-dialog-body__image-choose">
          <i class="el-icon-refresh"></i>
          <div>重新选择图片</div>
        </div>
      </div>
      <div class="ocr-template__try-dialog-body__ret">
        <el-tabs v-model="activeName">
          <el-tab-pane label="识别结果" name="result">
            <el-row>
              <div>未匹配到模板</div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="JSON" name="json">
            <json-pre />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </ocr-dialog>
</template>

<script>
import JsonPre from "@/components/Common/JsonPre";
export default {
  components: { JsonPre },
  data() {
    return {
      visible: false,
      jsonVisible: false,
      activeName: "result",
    };
  },
  methods: {
    show() {
      this.visible = true;
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