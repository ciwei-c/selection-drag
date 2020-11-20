<template>
  <div style="text-align:right">
    <el-button v-if="cancel" :size="size" type="cancel" @click="onCancel">取消</el-button>
    <el-button class="ocr-dialog__confirm-btn" type="primary" :icon="getIcon()" :size="size" @click="$emit('click')">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    cancel: Boolean,
    icon: String,
    size: String,
    beforeCancel: Function
  },
  methods: {
    getIcon() {
      // let iconMap = {
      //   primary: 'el-icon-check'
      // };
      return this.icon;
    },
    onCancel() {
      if (this.beforeCancel) {
        return this.beforeCancel();
      } else {
        let $parent = this.$parent;
        while (!$parent.hide) {
          $parent = $parent.$parent;
        }
        $parent.hide();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
