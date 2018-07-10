import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/oauth'
import './plugins/ghshop'
import './plugins/me'
import './plugins/sidebar'
import './plugins/toolbar'
import './plugins/toast'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
