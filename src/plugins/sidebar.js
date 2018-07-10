import Vue from 'vue'

const sidebar = {
  show: true
}

const Sidebar = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebar
        }
      }
    })
  }
}

Vue.use(Sidebar)
