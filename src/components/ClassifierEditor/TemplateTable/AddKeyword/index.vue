<template>
  <div>
    {{keyword}}
    <el-popover placement="bottom-start" width="300" trigger="click" :value="false" ref="popover">
      <div>
        <div style="margin-bottom:10px;font-size:12px">修改关键字</div>
        <el-form :model="model">
          <el-form-item prop="keyword">
            <el-input v-model="model.keyword" size="mini" placeholder="最多填写5个关键词，并使用逗号分隔"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:right;margin-top:10px">
          <el-button size="mini" @click="doClose">取消</el-button>
          <el-button size="mini" type="primary" @click="onConfirm">确定</el-button>
        </div>
      </div>
      <el-button slot="reference" icon="el-icon-plus" type="text" v-if="!keyword">请添加</el-button>
      <el-button v-else slot="reference" icon="el-icon-edit" type="text"></el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data(){
    return {
      model:{},
      keyword:""
    }
  },
  methods:{
    onAdd(){
      console.log(this)
    },
    onConfirm(){
      this.keyword = this.model.keyword
      this.doClose()
    },
    doClose(){
      this.$refs.popover.doClose()
    }
  }
};
</script>

<style>
</style>