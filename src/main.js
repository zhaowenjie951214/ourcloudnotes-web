import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import VueTinymce from '@packy-tang/vue-tinymce'
// Vue.use(VueTinymce)

import tinymce from 'tinymce'
Vue.prototype.$tinymce = tinymce


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
