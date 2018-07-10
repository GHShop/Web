<template>
  <v-navigation-drawer
    clipped
    enable-resize-watcher
    fixed
    app
    v-model="sidebar.show"
    v-if="me.show"
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
        @click="onClickSidebarItem(item.name)"
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
</template>

<script>
import gravatar from 'gravatar'

export default {
  name: 'the-sidebar',
  computed: {
    items () {
      if (this.me.show) {
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
      if (this.me.show)
        return gravatar.url(this.me.email)
    }
  },
  methods: {
    onClickSidebarItem (name) {
      switch (name) {
        case 'log out':
          this.logout()
          break
        case 'users':
          this.$router.replace({ name: 'user-list' })
          break
        case 'artists':
          this.$router.replace({ name: 'artist-list' })
          break
      }
    }
  }
}
</script>
