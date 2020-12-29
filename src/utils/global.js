import Vue from "vue"
import OcrTable from "@/components/OcrTable"
import OcrDialog from "@/components/Dialog"

Vue.component('ocr-table', OcrTable)
Vue.component('ocr-dialog', OcrDialog)


import { Loading, Message } from 'element-ui';

Vue.prototype.$globalLoading = function(options = {}){
  return Loading.service(Object.assign(options));
}

Vue.prototype.$globalRequest = function(fn, loading = true){
  let loadingInst = null
  if(loading) {
    if(typeof loading === "object"){
      if(loading.loading !== false) {
        loadingInst = this.$globalLoading(loading)
      }
    } else {
      loadingInst = this.$globalLoading({target:this.$el})
    }
  }
  return new Promise((resolve, reject) => {
    fn.then(data=>{
      loadingInst && loadingInst.close()
      if(data.code === "200"){
        resolve(data)
      } else {
        reject()
        if(data.code === "403" && this.$route.name === "dashboard") return
        Message.error(data.errMsg)
      }
    }).catch((err)=>{
      loadingInst && loadingInst.close()
      reject()
      Message.error(err)
    })
  })
}