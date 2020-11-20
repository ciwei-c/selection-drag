<template>
  <div class="ocr-select-editor__panel">
    <el-tabs v-model="activeName" style="height:100%">
      <el-tab-pane label="用户管理" name="step1">
        <span slot="label">第1步:框选参照字段 <i class="el-icon-question"></i> <i class="el-icon-caret-right" style="color:#ccc;transform:translateX(20px)"></i></span>
        <div style="height:100%">
           <el-alert
              title="至少选择4个参照字段"
              type="warning"
              center
              :closable="false"
            >
            </el-alert>
            <fields :data="fields" :parent="parent"/>
        </div>
      </el-tab-pane>
      <el-tab-pane name="step2" style="height:100%">
        <span slot="label">第2步:框选识别区 <i class="el-icon-question"></i></span>
        <div style="height:100%">
           <el-alert
              title="至少设置1个识别区"
              type="warning"
              center
              :closable="false"
            >
            </el-alert>
            <zones :data="zones" :parent="parent"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import emitMixin from "../emitMixin";
import Fields from "./Fields"
import Zones from "./Zones"
export default {
  mixins: [emitMixin],
  components: {Fields, Zones},
  computed:{
    parent(){
      return this
    }
  },
  data() {
    return {
      activeName: "step1",
      fields:[],
      zones:[]
    };
  },
  watch:{
    activeName:{
      immediate:true,
      handler(v){
        this.$emit('activeChange', v)
      }
    }
  },
  mounted(){
    this.eventOn('fieldSelect', v=>{
      this.fields[v.index] = Object.assign({}, v.data)
      this.fields = this.fields.map(v => v)
    })
    this.eventOn('zoneSelect', v=>{
      this.zones[v.index] = Object.assign({}, v.data)
      this.zones = this.zones.map(v => v)
    })
  },
  beforeDestroy(){
    this.eventOff('fieldSelect')
    this.eventOff('zoneSelect')
  }
};
</script>

<style lang="scss">
.ocr-select-editor__panel {
  position: absolute;
  padding: 20px;
  right: 0;
  top: 0;
  height: 100%;
  box-sizing: border-box;
  width: 380px;
  background: #f5f5f5;
  .el-tabs__content {
    height: calc(100% - 60px);
  }
  .el-tab-pane {
    height: 100%;
  }
}
</style>