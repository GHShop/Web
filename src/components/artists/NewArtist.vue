<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="fab"
        @click.stop="show()"
        fixed
        dark
        fab
        right
        bottom
        color="primary"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
    <artist-form
      :artist="artist"
      title="New Artist"
      submit-text="Create"
    ></artist-form>
  </div>
</template>

<script>
import ArtistForm from '@/components/artists/ArtistForm'

export default {
  name: 'new-artist',
  inject: ['refreshArtists'],
  components: {
    ArtistForm
  },
  data () {
    return {
      fab: false,
      artist: null
    }
  },
  methods: {
    show () {
      this.artist = {
        name: '',
        introduction: ''
      }
    },
    reset () {
      this.artist = null
    },
    createArtist (artist) {
      this.artist = null
      this.ghshop.postArtist(artist).then(() => {
        this.refreshArtists()
      })
    }
  },
  provide () {
    return {
      close: this.reset,
      submit: this.createArtist
    }
  },
  mounted () {
    this.fab = true
  },
  beforeDestroy () {
    this.fab = false
  }
}
</script>

<style scoped>
.v-btn--bottom:not(.v-btn--absolute) {
  bottom: 53px;
}
</style>
