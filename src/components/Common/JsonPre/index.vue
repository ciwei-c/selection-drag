<template>
  <pre v-highlight><code>{{JSON.stringify(json, null, 4)}}</code></pre>
</template>

<script>
export default {
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
  }
};
</script>

<style>
</style>