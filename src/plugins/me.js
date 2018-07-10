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
        async login () {
          var me = await this.ghshop.getMyself()
          Object.assign(this.me, me)
          this.me.show = true
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
