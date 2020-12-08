<template>
  <div style="display: inline-block; margin-right: 10px">
    <el-popover
      placement="right"
      width="400"
      trigger="click"
    >
      <div style="display:flex;justify-content: space-between;margin-bottom: 10px;">
        <div>示例JSON</div>
        <copy-cell :content="JSON.stringify(json)" :show-content="false" message="示例JSON已经复制到剪贴板"/>
      </div>
      <div style="max-height: 550px; overflow: auto" v-if="visible">
        <json-pre :json="json"/>
      </div>
      <el-button type="text" slot="reference">查看JSON</el-button>
    </el-popover>
  </div>
</template>

<script>
import CopyCell from "@/components/Template/CopyCell"
import JsonPre from "@/components/Common/JsonPre"
export default {
  components:{JsonPre, CopyCell},
  data() {
    return {
      visible: false,
    };
  },
  props: {
    json: {
      type: Object,
      default() {
        return {
          errorCode: 0,
          errorMsg: "",
          data: {
            ret: [
              { word_name: "date", word: "2019年01月29日" },
              { word_name: "seat_category", word: "新空调软卧" },
              { word_name: "starting_station", word: "北京西站" },
              { word_name: "ticket_num", word: "X080596" },
              { word_name: "train_num", word: "K179" },
              { word_name: "ticket_rates", word: "￥263.0元" },
              { word_name: "name", word: "孙尧佳" },
              { word_name: "destination_station", word: "郑州站" },
            ],
            templateSign: "train_ticket",
            templateName: "火车票",
            scores: 0.8909,
            isStructured: true,
            logId: "155867754468503",
          },
        };
      },
    },
  },
  mounted(){
    setTimeout(() => {
      this.visible = true
    }, 500);
  }
};
</script>

<style>
</style>