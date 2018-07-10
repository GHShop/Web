import Vue from 'vue'

const me = {
  show: false
}

const Me = {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          me
        }
      },
      methods: {
        login () {
          this.ghshop.getMyself().then(me => {
            Object.assign(this.me, me)
            this.me.show= true
          })
        },
        logout () {
          this.oauth.clearTokenData()
          this.me.show = false
          this.$router.replace({ name: 'main-page' })
        }
      }
    })
  }
}

Vue.use(Me)
