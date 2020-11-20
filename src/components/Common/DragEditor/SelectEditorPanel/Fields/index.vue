<template>
  <div class="ocr-select-editor__panel-fields">
    <field-item
      v-for="(item, idx) in data"
      :item="item"
      :key="idx"
      :index="idx"
      @mouseenter="onMouseover"
      @mouseleave="onMouseleave"
      @close="onClose"
    />
  </div>
</template>

<script>
import mixin from "../mixin";
import FieldItem from "./Item";
export default {
  mixins: [mixin],
  components: { FieldItem },
  props: {
    data: Array,
    parent: Object,
  },
  methods: {
    onClose(idx) {
      this.data.splice(idx, 1);
      this.parent.eventEmit("closeField", idx);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/color";
.ocr-select-editor__panel-fields {
  height: calc(100% - 40px);
  overflow: auto;
}
.ocr-select-editor__panel-field {
  margin-top: 20px;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  position: relative;
  &-title {
    font-size: 12px;
    color: $--color-info;
    margin-bottom: 10px;
    position: relative;
    i {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  &-tip {
    font-size: 12px;
    color: $--color-warning;
    margin-top: 10px;
  }
}
</style>