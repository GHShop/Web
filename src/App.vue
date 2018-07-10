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
  created () {
    var tokenData = this.oauth.getTokenData()
    if (tokenData) {
      this.ghshop.setTokenData(tokenData)
      this.login()
    }
    else
      this.$router.replace({ name: 'main-page' })
  }
}
</script>
