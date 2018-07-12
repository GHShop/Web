<template>
  <div>
    <v-scale-transition origin="center center 0">
      <div v-if="artists && mode === 'list'">
        <v-list two-line>
          <v-list-tile
            v-for="artist in artists"
            :key="artist.id"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="artist.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="artist.introduction"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="edit(artist)">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
    </v-scale-transition>
    <v-scale-transition origin="center center 0">
      <v-container
        v-if="artists && mode === 'card'"
        fluid
        grid-list-lg
      >
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
              <v-card-text>
                <pre v-text="artist.introduction"></pre>
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <v-btn
                  flat
                  color="primary"
                  @click="edit(artist)"
                >edit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-scale-transition>
    <new-artist />
    <edit-artist :artist="editedArtist" />
  </div>
</template>

<script>
import NewArtist from '@/components/artists/NewArtist'
import EditArtist from '@/components/artists/EditArtist'

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
    NewArtist,
    EditArtist
  },
  data () {
    return {
      artists: [],
      mode: 'list',
      editedArtist: null
    }
  },
  methods: {
    refresh () {
      this.artists = null
      this.ghshop.getArtists().then(artists => {
        this.artists = artists
      })
    },
    edit (artist) {
      this.editedArtist = Object.assign({}, artist)
    },
    updated () {
      this.editedArtist = null
    }
  },
  provide () {
    return {
      refreshArtists: this.refresh,
      onUpdateArtist: this.updated
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
      if (this.mode === 'list') {
        this.mode = ''
        await delay(250)
        this.mode = 'card'
        action.icon = icons.list
      } else {
        this.mode = ''
        await delay(250)
        this.mode = 'list'
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
pre {
  white-space: pre-wrap;
}
</style>
