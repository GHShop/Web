<template>
  <div>
    <v-scale-transition origin="center center 0">
      <div v-if="artist">
        <v-list two-line>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-text="artist.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="artist.introduction"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="edit()">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-divider />
        <v-list two-line v-if="products">
          <v-list-tile
            v-for="product in products"
            :key="product.id"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="product.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="product.introduction"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-scale-transition>
    <edit-artist :artist="artistToEdit" />
  </div>
</template>

<script>
import EditArtist from '@/components/artists/EditArtist'

export default {
  name: 'artist-page',
  props: ['id'],
  components: {
    EditArtist
  },
  data () {
    return {
      artist: null,
      artistToEdit: null,
      products: null
    }
  },
  methods: {
    refresh () {
      this.ghshop.getArtist(this.id).then(artist => {
        this.artist = artist
        this.ghshop.getProducts(artist).then(products => {
          this.products = products
        })
      })
    },
    edit () {
      this.artistToEdit = Object.assign({}, this.artist)
    },
    updated () {
      this.artistToEdit = null
    }
  },
  provide () {
    return {
      refreshArtists: this.refresh,
      onUpdateArtist: this.updated
    }
  },
  created () {
    this.toolbar.pushNavigation()
    this.refresh()
  }
}
</script>

<style scoped>
.v-list {
  background: inherit;
}
</style>
