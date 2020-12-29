<template>
  <div :class="`ocr-common-status-cell ocr-common-status-cell--${type.split('_')[0]}`">
    <div></div>
    <div>{{label}}</div>
  </div>
</template>

<script>
export default {
  props:{
    type:String,
    label:String
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/color";
.ocr-common-status-cell {
  display: flex;
  align-items: center;
  > div:first-child {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    margin-right: 10px;
  }
  &--waiting {
    > div:first-child {
      background: $--color-danger;
    }
    > div:last-child {
      color: $--color-danger;
    }
  }
  &--in {
    > div:first-child {
      background: $--color-primary;
    }
    > div:last-child {
      color: $--color-primary;
    }
  }
  &--complete {
    > div:first-child {
      background: $--color-success;
    }
    > div:last-child {
      color: $--color-success;
    }
  }
}
</style>