<template>
  <artist-form
    :artist="artist"
    title="Edit Artist"
    submit-text="Update"
  ></artist-form>
</template>

<script>
import ArtistForm from '@/components/artists/ArtistForm'

export default {
  name: 'edit-artist',
  props: ['artist'],
  inject: [
    'refreshArtists',
    'onUpdateArtist'
  ],
  components: {
    ArtistForm
  },
  methods: {
    updateArtist (artist) {
      this.onUpdateArtist()
      this.ghshop.putArtist(artist).then(() => {
        this.refreshArtists()
      })
    }
  },
  provide () {
    return {
      close: this.onUpdateArtist,
      submit: this.updateArtist
    }
  }
}
</script>
