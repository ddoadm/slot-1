import Vue from 'vue'
import Vuesax from 'vuesax'

import App from './App.vue'

import 'material-icons/iconfont/material-icons.css';
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false

Vue.use(Vuesax)

new Vue({
  render: h => h(App)
}).$mount('#app')
