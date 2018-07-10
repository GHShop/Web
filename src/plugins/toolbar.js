import Vue from 'vue'

const appBar = {
  actions: {}
}

const Toolbar = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          appBar
        }
      },
      methods: {
        onClickToolbarAction (action) {
          this.toolbar.callbacks[action.name](action)
        }
      }
    })

    Vue.prototype.toolbar = {
      callbacks: {},
      addAction (action, callback) {
        appBar.actions = Object.assign({}, appBar.actions, {
          [action.name]: action
        })
        this.callbacks[action.name] = callback
      },
      updateAction (action, callback) {
        appBar.actions = Object.assign({}, appBar.actions, {
          [action.name]: action
        })
        if (typeof callback === 'function')
          this.callbacks[action.name] = callback
      },
      removeAction (action) {
        delete appBar.actions[action.name]
        appBar.actions = Object.assign({}, appBar.actions)
        delete this.callbacks[action.name]
      }
    }
  }
}

Vue.use(Toolbar)
