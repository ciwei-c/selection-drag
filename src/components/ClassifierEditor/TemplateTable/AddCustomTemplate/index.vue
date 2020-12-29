<template>
  <span style="margin-right: 10px">
    <el-button @click="onAdd">添加自定义模板</el-button>
    <ocr-dialog
      :visible.sync="visible"
      title="添加自定义模板"
      width="600px"
      @confirm="onConfirm"
    >
      <div style="transform: translateY(-15px)">
        <el-input
          placeholder="请输入模板名称进行搜索"
          v-model="search"
        ></el-input>
      </div>
      <ocr-table
        class="classifier-editor__template-table"
        :columns="columns"
        :data="data"
        :enablePage="false"
        :enableSelect="true"
        @selection-change="onSelectChange"
      ></ocr-table>
      <div style="margin-top: 10px; font-size: 12px">
        注：已发布的模板方可参与分类
      </div>
    </ocr-dialog>
  </span>
</template>

<script>
export default {
  props:{
    addedTemplate:Array
  },
  data() {
    return {
      data: [],
      columns: [
        {
          title: "模板名称",
          key: "templateName",
        },
        {
          title: "模板ID",
          key: "templateId",
        },
      ],
      search: "",
      visible: false,
      selections: [],
    };
  },
  watch: {
    search(v) {
      this.onSearch();
    },
  },
  methods: {
    onSelectChange(selections) {
      this.selections = selections;
    },
    onAdd() {
      this.visible = true;
      this.$globalRequest(
        this.$apis.template.getAllTemplates({
          preset: false,
          deploy: true,
        })
      ).then((data) => {
        this.data = data.data.filter(v=>{
          if(this.addedTemplate.includes(v.templateId)){
            return false
          }
          return true
        });
      });
    },
    onSearch() {
      let matchedIndex = [];
      if(this.search) {
        this.data.forEach((v, idx) => {
          if (v.templateName.indexOf(this.search) > -1) {
            matchedIndex.push(idx);
          }
        });
      }
      let trs = document
        .querySelector(".classifier-editor__template-table")
        .querySelectorAll(".el-table__row");
      
      Array.from(trs).forEach((tr, i) => {
        if (matchedIndex.includes(i) || !this.search) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }
      })
    },
    onConfirm() {
      //TODO 支持多选模板
      this.$globalRequest(this.$apis.classifier.addClassifierTemplate({
        classifierId: this.$route.query.classifierId,
        presetTemplate: false,
        templateId: this.selections[0].templateId
      })).then(()=>{
        this.$message.success('添加模板成功')
        this.visible = false
        this.$emit('success')
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/color";
</style>