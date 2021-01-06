import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/base.css'

Vue.config.productionTip = false

let vm

if (process.env.NODE_ENV === 'production') {
  document.addEventListener('deviceready', function () {
    vm = new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App)
    })
  })
} else {
  vm = new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
  })
}
export default vm
