import Vue from 'vue';
import Router from 'vue-router';
import FormGenerator from './views/FormGenerator.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'formGenerator',
      component: FormGenerator,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue'),
    },
  ],
});
