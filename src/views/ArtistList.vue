<template>
  <div>
    <v-scale-transition origin="center center 0">
      <div v-if="list">
        <v-list>
          <v-list-tile
            v-for="artist in artists"
            :key="artist.id"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="artist.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="artist.introduction"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
    </v-scale-transition>
    <v-scale-transition origin="center center 0">
      <v-container fluid grid-list-lg v-if="card">
        <v-layout row wrap>
          <v-flex
            xs12 sm6 md4 lg3
            v-for="artist in artists"
            :key="artist.id"
          >
            <v-card>
              <v-card-title>
                <div class="headline" v-text="artist.name"></div>
              </v-card-title>
              <v-card-text v-text="artist.introduction">
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn flat color="primary">edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-scale-transition>
    <new-artist />
  </div>
</template>

<script>
import NewArtist from '@/components/artists/NewArtist'

const icons = {
  list: 'view_list',
  card: 'view_module'
}

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'artist-list',
  components: {
    NewArtist
  },
  data () {
    return {
      artists: [],
      card: false,
      list: true
    }
  },
  methods: {
    refresh () {
      this.ghshop.getArtists().then(artists => {
        this.artists = artists
      })
    }
  },
  provide () {
    return {
      refreshArtists: this.refresh
    }
  },
  created () {
    this.refresh()
    this.toolbar.addAction({
      name: 'refresh-artists',
      icon: 'refresh'
    }, () => {
      this.refresh()
    })
    this.toolbar.addAction({
      name: 'switch-card',
      icon: icons.card
    }, async action => {
      if (this.list) {
        this.list = false
        await delay(250)
        this.card = true
        action.icon = icons.list
      } else {
        this.card = false
        await delay(250)
        this.list = true
        action.icon = icons.card
      }
      this.toolbar.updateAction(action)
    })
  },
  beforeDestroy () {
    this.toolbar.removeAction({ name: 'refresh-artists' })
    this.toolbar.removeAction({ name: 'switch-card' })
  }
}
</script>

<style scoped>
.v-list {
  background: inherit;
}
</style>
