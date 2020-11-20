<template>
  <div class="ocr-common-status-cell">
    <div></div>
    <div>待训练</div>
  </div>
</template>

<script>
export default {

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
    background: $--color-danger;
    border-radius: 50%;
    margin-right: 10px;
  }
  > div:last-child {
    color: $--color-danger;
  }
}
</style>