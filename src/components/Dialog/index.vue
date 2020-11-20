<template>
  <el-dialog :visible.sync="dialogVisible" :title="title" class="iarchives-dialog" :append-to-body="appendToBody" :width="width">
    <slot></slot>
    <dialog-button v-if="buttonVisible" slot="footer" :type="type" :icon="icon" :cancel="cancel" :size="size" :beforeCancel="beforeCancel" @click="onClick">{{ confirmText }}</dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from './DialogButton';
export default {
  components: { DialogButton },
  props: {
    width: String,
    appendToBody: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    buttonVisible: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'primary'
    },
    icon: String,
    size: {
      type: String,
      default: 'medium'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: Boolean,
      default: true
    },
    beforeCancel: Function
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler(v) {
        this.$nextTick(() => {
          this.dialogVisible = v;
        });
      }
    },
    dialogVisible(v) {
      this.$emit('update:visible', v);
    }
  },
  methods: {
    onClick() {
      this.$emit('confirm');
    }
  }
};
</script>

<style></style>
