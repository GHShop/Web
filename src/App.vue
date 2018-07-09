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
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        right
      >
        {{snackbar.message}}
      </v-snackbar>
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
      title: 'GHShop',
      me: null
    }
  },
  computed: {
    items () {
      if (this.me) {
        var items = []
        if (this.me.levelNumber >= 3)
          items.push({
            name: 'users',
            icon: 'people',
            title: 'Users'
          })
        if (this.me.levelNumber >= 2)
          items.push({
            name: 'artists',
            icon: 'photo',
            title: 'Artists'
          }, {
            name: 'sales histroy',
            icon: 'history',
            title: 'Sales Histroy'
          })
        if (this.me.levelNumber >= 1)
          items.push({
            name: 'selling',
            icon: 'shopping_cart',
            title: 'Selling'
          })
        items.push({
          name: 'log out',
          icon: 'exit_to_app',
          title: 'Log out'
        })
        return items
      }
    },
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
        case 'users':
          this.$router.replace({ name: 'user-list' })
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
