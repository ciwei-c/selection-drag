<template>
  <ocr-dialog :visible.sync="visible" :title="title" width="1000px">
    <div class="ocr-select-editor__tips">
      <div v-for="(tip, idx) in tips" :key="idx">
        <div class="ocr-select-editor__tips-title">{{tip.title}}</div>  
        <div class="ocr-select-editor__tips-desc" v-if="tip.desc">{{tip.desc}}</div>  
        <div v-if="tip.children" class="ocr-select-editor__tips-children">
          <div v-for="(item, innerIdx) in tip.children" :key="innerIdx">
            <img :src="item.image" alt="">
            <div class="ocr-select-editor__tips-desc" v-if="item.desc">{{item.desc}}</div>
          </div>
        </div>  
      </div> 
    </div>
  </ocr-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible:false,
      title: "框选参照字段",
      tips: [{
        title:"参照字段是什么？",
        desc:"参照字段为图片中文字及位置固定的文字内容，用于相同版式识别图片的自动矫正和模板匹配"
      },{
        title:"如何框选参照字段？",
        children:[{
          image:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          desc:'1. 框选4个以上参照字段，并尽量分散在四角'
        },{
          image:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          desc:'2. 保证框选的文字内容、位置固定不变'
        },{
          image:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          desc:'3. 单个参照字段不可跨行'
        },{
          image:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          desc:'4. 选取图片中不会重复出现的文字'
        },{
          image:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          desc:'5.仅支持中英文、数字，不可包含符号、图案'
        }]
      }]
    };
  },
  methods:{
    show(){
      this.visible = true
    }
  }
};
</script>

<style lang="scss" scoped>
.ocr-select-editor__tips {
  background-color: #f8f8f8;
  border: 2px solid #f2f2f2;
  padding: 30px 20px 0;
  max-height: 510px;
  overflow: auto;
  color: #000;
  > div {
    margin-bottom: 10px;
  }
  &-children {
    > div {
      width: 33.33%;
      display: inline-flex;
      flex-direction: column;
      &:nth-child(3n-1){
        * {
          margin-left: 10px;
        }
      }
      &:nth-child(3n){
        * {
          margin-left: 20px;
        }
      }
    }
    img {
      width: 250px;
      margin-bottom: 10px;
    }
  }
  &-title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  &-desc{
    font-size: 13px;
    margin-bottom: 20px;
    color: #666;
  }
}
</style>