<template>
  <div>
    <v-fab-transition>
      <v-btn
        v-if="fab"
        @click.stop="dialog = true"
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
    <v-dialog
      v-model="dialog"
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
          <v-btn icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>New Artist</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="createArtist(artist)">
            <v-icon>send</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-title
          v-if="$vuetify.breakpoint.smAndUp"
          class="headline lighten-2"
          primary-title
        >
          New Artist
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
          <v-btn flat color="primary" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn flat color="primary" @click="createArtist(artist)">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'new-artist',
  inject: ['refreshArtists'],
  data () {
    return {
      dialog: false,
      fab: false,
      valid: false,
      artist: {
        name: '',
        introduction: ''
      },
      rules: {
        name: [ v => !!v || 'Name is required' ],
        introduction: [ v => !!v || 'Introduction is required' ],
      }
    }
  },
  methods: {
    createArtist (artist) {
      if (this.valid) {
        this.dialog = false
        this.ghshop.postArtist(artist).then(() => {
          this.$refs.form.reset()
          this.refreshArtists()
        })
      }
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
