import Vue from 'vue';
import SetariaUI from 'setaria-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'setaria-ui/lib/theme-chalk/index.css';

import 'normalize.css';
import './assets/css/main.css';

Vue.config.productionTip = false;

Vue.use(SetariaUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
