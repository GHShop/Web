<template>
  <v-dialog
    v-if="artist"
    v-model="artist"
    :fullscreen="$vuetify.breakpoint.xs"
    persistent
    transition="dialog-bottom-transition"
    :max-width="$vuetify.breakpoint.smAndUp ? 560 : 600"
  >
    <v-card>
      <v-toolbar
        v-if="$vuetify.breakpoint.xs"
        dark
        color="primary"
      >
        <v-btn icon @click="onUpdateArtist()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>New Artist</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="updateArtist(artist)">
          <v-icon>send</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title
        v-if="$vuetify.breakpoint.smAndUp"
        class="headline lighten-2"
        primary-title
      >
        Edit Artist
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="artist.name"
            :rules="rules.name"
            label="Name"
            required
          ></v-text-field>
          <v-textarea
            v-model="artist.introduction"
            :rules="rules.introduction"
            label="Introduction"
            required
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions v-if="$vuetify.breakpoint.smAndUp">
        <v-spacer />
        <v-btn flat color="primary" @click="onUpdateArtist()">
          Cancel
        </v-btn>
        <v-btn flat color="primary" @click="updateArtist(artist)">
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'edit-artist',
  props: ['artist'],
  inject: ['refreshArtists', 'onUpdateArtist'],
  data () {
    return {
      valid: false,
      rules: {
        name: [ v => !!v || 'Name is required' ],
        introduction: [ v => !!v || 'Introduction is required' ],
      }
    }
  },
  methods: {
    updateArtist (artist) {
      if (this.valid) {
        this.onUpdateArtist()
        this.ghshop.putArtist(artist).then(() => {
          this.refreshArtists()
        })
      }
    }
  }
}
</script>
