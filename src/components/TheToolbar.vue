<template>
  <v-toolbar
    color="primary"
    dark
    clipped-left
    app
  >
    <v-toolbar-side-icon
      @click.stop="navigation.back ? navigateBack() : (sidebar.show = !sidebar.show)"
      v-if="me.show"
    >
      <v-icon v-if="navigation.back">arrow_back</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
    <v-spacer />
    <v-scale-transition
      v-for="action in appBar.actions"
      :key="action.name"
      origin="center center 0"
    >
      <v-btn
        v-if="!action.hide"
        @click="onClickToolbarAction(action)"
        icon
      >
        <v-icon v-text="action.icon"></v-icon>
      </v-btn>
    </v-scale-transition>
  </v-toolbar>
</template>

<script>
const titles = {
  'user-list': 'Users',
  'artist-list': 'Artists',
  'artist-page': 'Artist'
}

export default {
  name: 'the-toolbar',
  computed: {
    title () {
      var title = titles[this.$route.name]
      if (title)
        return title
      return 'GHShop'
    }
  }
}
</script>
