<template>
  <v-app>
    <the-sidebar />
    <the-toolbar />
    <v-content>
      <router-view />
      <the-toast />
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheSidebar from './components/TheSidebar'
import TheToolbar from './components/TheToolbar'
import TheFooter from './components/TheFooter'
import TheToast from './components/TheToast'

export default {
  name: 'App',
  components: {
    TheSidebar,
    TheToolbar,
    TheFooter,
    TheToast
  },
  methods: {
    redirectToHome () {
      if (this.me.can.own)
        this.$router.replace({ name: 'user-list' })
      else if (this.me.can.manage)
        this.$router.replace({ name: 'artist-list' })
      else
        this.$router.replace({ name: 'main-page' })
    }
  },
  created () {
    var tokenData = this.oauth.getTokenData()
    if (tokenData) {
      this.ghshop.setTokenData(tokenData)
      this.login().then(() => {
        if (tokenData.fromHash)
          this.redirectToHome()
      })
    }
    else
      this.$router.replace({ name: 'main-page' })
  }
}
</script>
