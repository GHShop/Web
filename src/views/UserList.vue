<template>
  <v-list class="users">
    <v-list-tile
      v-for="user in users"
      :key="user.id"
      avatar
    >
      <v-list-tile-avatar>
        <img :src="user.avatarUrl" >
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-text="user.name"></v-list-tile-title>
        <v-list-tile-sub-title v-text="user.email"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-menu offset-y>
          <v-btn slot="activator" icon>
            <v-icon v-text="icons[user.levelNumber]"></v-icon>
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(level, i) in levels"
              :key="i"
              @click="changeLevel(user, level.name)"
            >
              <v-list-tile-action>
                <v-icon v-text="level.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="level.name"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import gravatar from 'gravatar'

export default {
  name: 'user-list',
  data () {
    return {
      users: [],
      icons: ['person', 'credit_card', 'business', 'settings'],
      levels: [
        { name: 'Owner', icon: 'settings' },
        { name: 'Manager', icon: 'business' },
        { name: 'Clerk', icon: 'credit_card' },
        { name: 'Guest', icon: 'person' }
      ]
    }
  },
  created () {
    this.ghshop.getUsers().then(users => {
      for (var user of users)
        user.avatarUrl = gravatar.url(user.email)
      this.users = users
    })
  },
  methods: {
    changeLevel (user, level) {
      var nUser = Object.assign({}, user)
      nUser.level = level
      this.toast.dismiss()
      this.ghshop.putUser(nUser).then(nUser => {
        Object.assign(user, nUser)
        this.toast.success('Updated')
      })
    }
  }
}
</script>

<style scoped>
.users {
  background: inherit
}
</style>
