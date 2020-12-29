export default {
  data(){
    return {
      imageUrl: ""
    }
  },
  computed: {
    action() {
      return "/image/template-image/upload";
    },
  },
  methods:{
    onSuccess(data) {
      if (data.code === "200") {
        this.imageUrl = data.data.imageUrl;
        this.imageId = data.data.imageId;
      } else {
        this.$message.error(data.errMsg);
      }
    },
    beforeUpload(file) {
      if(this.isOversize(file)) return false
    },
    isOversize(file){
      if (file.size / (1024 * 1024) > 4) {
        this.$message.error("请上传不大于4M的图片");
        return true;
      }
      return false
    }
  }
}