<template>
  <div class="ocr-select-editor__panel-zones">
    <zone-item 
      v-for="(item, idx) in data"
      :item="item"
      :key="idx"
      :index="idx"
      @close="onClose"
      @mouseenter="onMouseover"
      @mouseleave="onMouseleave"
    />
  </div>
</template>

<script>
import mixin from "../mixin";
import ZoneItem from "./Item"
export default {
  components:{ZoneItem},
  data() {
    return {
    }
  },
  mixins: [mixin],
  props: {
    data: Array,
    parent: Object,
  },
  methods: {
    onClose(idx) {
      this.data.splice(idx, 1);
      this.parent.eventEmit("closeZone", idx);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/color";
.ocr-select-editor__panel-zones {
  height: calc(100% - 40px);
  overflow: auto;
}
.ocr-select-editor__panel-zone {
  margin-top: 20px;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  padding-top: 20px;
  position: relative;
  &-title {
    font-size: 12px;
    color: $--color-info;
    margin-bottom: 20px;
    position: relative;
    i {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  &-column,
  &-field-name,
  &-table-name,
  &-field-type,
  &-ret {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    > span {
      display: inline-block;
      width: 60px;
      min-width: 60px;
      font-size: 12px;
      color: $--color-info;
      text-align: left;
    }
  }
  
  &-column {
    align-items: flex-start;
    border-bottom: 1px solid #f2f2f2;
    > span {
      transform: translateY(6px);
    }
  }
  &-ret {
    div {
      color: #999;
      font-size: 12px;
    }
  }
  &-tip {
    font-size: 12px;
    color: $--color-warning;
    margin-top: 10px;
  }
}
</style>