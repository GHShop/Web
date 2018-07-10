<template>
  <v-toolbar
    color="primary"
    dark
    clipped-left
    app
    >
    <v-toolbar-side-icon
      @click.stop="sidebar.show = !sidebar.show"
      v-if="me.show"
      ></v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'the-toolbar',
  data () {
    return {
      title: 'GHShop'
    }
  }
}
</script>
