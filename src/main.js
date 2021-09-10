import Vue from 'vue';
import SetariaUI from 'setaria-ui';
import ProTable from 'setaria-ui/lib/pro-table';
import ProTableCommonInstall from 'setaria-ui/packages/pro-table/src/common-install';
// import EditableProTable from 'packages/editable-pro-table/index.js';
import App from './App.vue';
import router from './router';
import store from './store';


import 'setaria-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './assets/css/main.css';

import 'setaria-ui/packages/theme-chalk/src/vxe-table.scss';
import 'setaria-ui/packages/theme-chalk/src/pro-table.scss';
// import 'setaria-ui/packages/theme-chalk/src/editable-pro-table.scss';

Vue.config.productionTip = false;

Vue.use(SetariaUI);
Vue.use(ProTableCommonInstall);
Vue.component('el-pro-table', ProTable);
// Vue.component('el-editable-pro-table', EditableProTable);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
