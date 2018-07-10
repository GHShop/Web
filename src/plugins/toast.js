import Vue from 'vue'

const snackbar = {
  show: false,
  color: 'success',
  message: '',
  timeout: 3000
}

const Toast = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          snackbar
        }
      }
    })
    Vue.prototype.toast = {
      success (message) {
        Object.assign(snackbar, {
          show: true,
          color: 'success',
          message: message
        })
      }
    }
  }
}

Vue.use(Toast)
