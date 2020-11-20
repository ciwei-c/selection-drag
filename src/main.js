import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import api from '@/api';
import ElementUI from 'element-ui';
import './styles/index.scss';
import Highlight from  '@/directive/highlight'

Vue.use(Highlight);

Vue.use(ElementUI, {
  size:'small'
});
import './utils/global';

Vue.prototype.$apis = api;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
