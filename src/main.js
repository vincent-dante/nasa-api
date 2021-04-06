import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueMasonry from 'vue-masonry-css';

Vue.config.productionTip = false;
Vue.use(VueMasonry);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
