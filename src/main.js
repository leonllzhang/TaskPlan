import Vue from 'vue'
import './plugins/axios'
import './plugins/vuetify'
import './plugins/moment'
import App from './App.vue'



Vue.config.productionTip = false
Vue.config.devtools = true;

new Vue({  
  render: h => h(App),
}).$mount('#app')
