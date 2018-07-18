<template>
  <div>
    <v-scale-transition origin="center center 0">
      <div v-if="artists && view === 'list'">
        <v-list two-line>
          <v-list-tile
            v-for="artist in artists"
            :key="artist.id"
            :to="{ name: 'artist-page', params: { id: artist.id } }"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="artist.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="artist.introduction"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.prevent="mode == 'edit' ? edit(artist) : confirmDelete(artist)">
                <v-icon :color="mode == 'delete' ? 'error' : undefined" v-text="mode"></v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
    </v-scale-transition>
    <v-scale-transition origin="center center 0">
      <v-container
        v-if="artists && view === 'card'"
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex
            xs12 sm6 md4 lg4 xl3
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
                  :to="{ name: 'artist-page', params: { id: artist.id } }"
                >show</v-btn>
                <v-btn
                  flat
                  color="primary"
                  @click="edit(artist)"
                >edit</v-btn>
                <v-btn
                  flat
                  color="error"
                  @click="confirmDelete(artist)"
                >delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-scale-transition>
    <new-artist />
    <edit-artist :artist="artistToEdit" />
    <delete-artist :artist="artistToDelete" />
  </div>
</template>

<script>
import NewArtist from '@/components/artists/NewArtist'
import EditArtist from '@/components/artists/EditArtist'
import DeleteArtist from '@/components/artists/DeleteArtist'

const icons = {
  list: 'view_list',
  card: 'view_module',
  edit: 'edit',
  delete: 'delete'
}

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'artist-list',
  components: {
    NewArtist,
    EditArtist,
    DeleteArtist
  },
  data () {
    return {
      artists: [],
      view: 'list',
      mode: 'edit',
      artistToEdit: null,
      artistToDelete: null
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
      this.artistToEdit = Object.assign({}, artist)
    },
    updated () {
      this.artistToEdit = null
    },
    confirmDelete (artist) {
      this.artistToDelete = artist
    },
    deleted () {
      this.artistToDelete = null
    }
  },
  provide () {
    return {
      refreshArtists: this.refresh,
      onUpdateArtist: this.updated,
      onDeleteArtist: this.deleted
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
    var modeAction = {
      name: 'switch-mode',
      icon: icons.delete,
      hide: false
    }
    this.toolbar.addAction(modeAction, action => {
      if (this.mode === 'edit') {
        this.mode = 'delete'
        action.icon = icons.edit
      }
      else {
        this.mode = 'edit'
        action.icon = icons.delete
      }
      this.toolbar.updateAction(action)
    })
    this.toolbar.addAction({
      name: 'switch-view',
      icon: icons.card
    }, async action => {
      if (this.view === 'list') {
        this.view = ''
        await delay(250)
        this.view = 'card'
        action.icon = icons.list
        modeAction.hide = true
      } else {
        this.view = ''
        await delay(250)
        this.view = 'list'
        action.icon = icons.card
        modeAction.hide = false
      }
      this.toolbar.updateAction(action)
      this.toolbar.updateAction(modeAction)
    })
  },
  beforeDestroy () {
    this.toolbar.removeAction({ name: 'refresh-artists' })
    this.toolbar.removeAction({ name: 'switch-mode' })
    this.toolbar.removeAction({ name: 'switch-view' })
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
