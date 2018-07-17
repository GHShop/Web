<template>
  <v-dialog
    v-if="artist"
    v-model="artist"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">Delete {{artist.name}}?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="onDeleteArtist()"
          flat
        >Cancel</v-btn>
        <v-btn
          color="error"
          @click="deleteArtist(artist)"
          flat
        >Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'delete-artist',
  props: ['artist'],
  inject: [
    'refreshArtists',
    'onDeleteArtist'
  ],
  methods: {
    deleteArtist (artist) {
      this.onDeleteArtist()
      this.ghshop.deleteArtist(artist).then(() => {
        this.refreshArtists()
      })
    }
  }
}
</script>
