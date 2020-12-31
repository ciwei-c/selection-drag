<template>
  <div class="ocr-field">
    <table-action :activeName="activeName" :parent="parent" ref="action"/>
    <el-tabs v-model="activeName">
      <el-tab-pane label="字段类型管理" name="field">
        <ocr-table
          :columns="fieldColumns"
          :data="fieldData"
          :page="page"
          @page-change="getFields"
        ></ocr-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TableAction from "@/components/Field/TableAction";
import StatusCell from "@/components/Common/StatusCell";
import { parseTime } from "@/utils";
import translateMixin from "@/mixins/translateMixin";
export default {
  mixins: [translateMixin],
  components: { TableAction, StatusCell },
  data() {
    return {
      activeName: "field",
      fieldColumns: [],
      fieldData: [],
      page: {
        total: 0,
        size: 20,
        index: 1,
      },
    };
  },
  computed: {
    parent() {
      return this;
    },
  },
  mounted() {
    this.setColumns();
    this.getFields();
  },
  methods: {
    getFields() {
      this.$globalRequest(
        this.$apis.field.getFields({
          pageNum: this.page.index,
          pageSize: this.page.size,
        })
      ).then((data) => {
        this.fieldData = data.data.list;
        this.page.total = data.data.totalRecord;
        this.translate = data.translate;
      });
    },
    setColumns() {
      let columns = [
        {
          title: "字段类型名称",
          key: "fieldName",
        },
        {
          title: "训练状态",
          key: "trainingState",
          format: (row) => {
            return (
              <StatusCell
                type={row.trainingState || ''}
                label={this.translateProp(row, "trainingState")}
              />
            );
          },
        },
        {
          title: "发布时间",
          key: "deployTime",
          format: (row) => {
            return parseTime(row.deployTime);
          },
        },
        {
          title: "预估准确率",
          key: "accuracy",
          format: (row) => {
            return row.accuracy || "--";
          },
        },
        {
          title: "修改时间",
          key: "modifyTime",
          format: (row) => {
            return parseTime(row.modifyTime);
          },
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          format: (row) => {
            return (
              <div>
                <el-button type="text">查看</el-button>
                <el-button type="text">测试</el-button>
                <el-button type="text" on-click={() => this.onEdit(row)}>
                  修改
                </el-button>
                <el-button type="text" on-click={() => this.onDelete(row)}>
                  删除
                </el-button>
                <el-button type="text">发布</el-button>
              </div>
            );
          },
        },
      ];
      this.fieldColumns = columns;
    },
    onDelete({ fieldName, fieldId }) {
      this.$confirm(`是否确认删除字段类型 ${fieldName}, 删除后无法恢复`, {
        title: "确认",
        type: "warning",
      }).then(() => {
        this.$globalRequest(
          this.$apis.field.deleteField({ fieldId })
        ).then(() => {
          this.$message.success("删除成功");
          this.getFields();
        });
      });
    },
    onEdit(row) {
      if(row.custom) {
        this.$refs.action.editCustom(row)
      }
    },
  },
};
</script>

<style lang="scss" >
.ocr-field {
  padding: 20px;
  position: relative;
}
</style>