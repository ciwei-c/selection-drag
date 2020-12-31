import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/template',
    name: 'template',
    component: () => import('@/views/template/index.vue')
  },
  {
    path: '/template-editor',
    name: 'template-editor',
    component: () => import('@/views/template/TemplateEditor.vue')
  },
  {
    path: '/classifier',
    name: 'classifier',
    component: () => import('@/views/classifier/index.vue')
  },
  {
    path: '/classifier-editor',
    name: 'classifier-editor',
    component: () => import('@/views/classifier/ClassifierEditor.vue')
  },
  {
    path: '/field',
    name: 'field',
    component: () => import('@/views/field/index.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  routes
});

export default router;
