<template>
  <v-app>
    <v-navigation-drawer
      clipped
      enable-resize-watcher
      fixed
      app
      v-model="drawer"
      v-if="me"
    >
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="avatarUrl" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="me.name"></v-list-tile-title>
            <v-list-tile-sub-title v-text="me.email"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="clickOnItem(item.name)"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="primary"
      dark
      clipped-left
      app
    >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        v-if="me"
      ></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer fixed app>
      <v-flex
        primary
        lighten-2
        py-2
        text-xs-center
        white--text
      >
        &copy; 2018 - GHShop
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
import gravatar from 'gravatar'

export default {
  name: 'App',
  data () {
    return {
      drawer: true,
      items: [{
        name: 'log out',
        icon: 'exit_to_app',
        title: 'Log out'
      }],
      title: 'GHShop',
      me: null
    }
  },
  computed: {
    avatarUrl () {
      if (this.me)
        return gravatar.url(this.me.email)
    }
  },
  methods: {
    clickOnItem (itemName) {
      switch (itemName) {
        case 'log out':
          this.logout()
          break
      }
    },
    logout () {
      this.oauth.clearTokenData()
      this.me = null
      this.$router.replace({ name: 'main-page' })
    }
  },
  created () {
    var tokenData = this.oauth.getTokenData()
    if (tokenData) {
      this.ghshop.setToken(tokenData.accessToken)
      this.ghshop.getMyself().then(me => { this.me = me })
    } else
      this.$router.replace({ name: 'main-page' })
  }
}
</script>
