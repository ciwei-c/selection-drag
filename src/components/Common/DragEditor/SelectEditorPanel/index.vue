<template>
  <div class="ocr-select-editor__panel">
    <tips ref="tips"/>
    <el-tabs v-model="activeName" style="height:100%">
      <el-tab-pane label="用户管理" name="step1">
        <span slot="label">第1步:框选参照字段 <i class="el-icon-question" @click="onClickTips"></i> <i class="el-icon-caret-right" style="color:#ccc;transform:translateX(20px)"></i></span>
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
        <span slot="label">第2步:框选识别区 <i class="el-icon-question"  @click="onClickTips"></i></span>
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
import Tips from "./Tips"
import Fields from "./Fields"
import Zones from "./Zones"
export default {
  mixins: [emitMixin],
  components: {Fields, Zones, Tips},
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
    const set = (v, prop, data = {}) => {
      let originData = this[prop][v.index] || {}
      this[prop][v.index] = Object.assign(data, originData, v.data)
      this[prop] = this[prop].map(v => v)
      this.getBase64Data(v).then((result)=>{
        v.data.identificationResult = result
        this[prop][v.index] = Object.assign(data, originData, v.data)
        this[prop] = this[prop].map(v => v)
        console.log(this[prop])
      })
    }
    this.eventOn('fieldSelect', v=>{
      set(v, 'fields', {identificationResult:''})
    })
    this.eventOn('zoneSelect', v=>{
      set(v, 'zones', {fieldType:'',identificationResult:''})
    })
  },
  beforeDestroy(){
    this.eventOff('fieldSelect')
    this.eventOff('zoneSelect')
  },
  methods:{
    getDatas(){
      if(document.querySelector('.ocr-select-editor__panel-zone--error')) {
        this.$message.error('识别区存在为空的字段名称')
        return
      }
      if(this.fields.length < 4) {
        this.$message.error('至少选择4个参照字段')
        return
      }
      if(!this.zones.length) {
        this.$message.error('至少设置1个识别区')
        return
      }
      return {
        fields:this.fields,
        zones:this.zones
      }
    },
    onClickTips(){
      this.$refs.tips.show()
    },
    getBase64Data(v){
      return new Promise(res=>{
        let image = document.querySelector('.ocr-select-editor__container-image')
        let canvas = document.createElement('canvas')
        canvas.height = v.data.endClientY - v.data.startClientY 
        canvas.width = v.data.endClientX - v.data.startClientX
        document.querySelector('.ocr-select-editor__panel-fields').appendChild(canvas)
        let ctx = canvas.getContext('2d')
        canvas.style.position = 'fixed'
        canvas.style.zIndex = '-100'
        let img = new Image()
        img.src = image.src.split("/iocr-server/v1/")[1]
        img.onload = () => {
          ctx.drawImage(img, v.data.startClientX, v.data.startClientY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
          let url = canvas.toDataURL()
          this.$globalRequest(this.$apis.template.areaIdentify({
            areaImageBase64:url
          })).then(data=>{
            res(data.data.result)
          })
        };
      })
    },
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