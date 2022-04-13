import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import Toast, { POSITION } from 'vue-toastification'
// https://github.com/Maronato/vue-toastification
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false

Vue.use(Toast, {
  timeout: 5000,
  position: POSITION.TOP_CENTER,
  hideProgressBar: true
})

Vue.use(vueAwesomeCountdown, 'vac')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
