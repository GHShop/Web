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
    <v-spacer />
    <v-scale-transition origin="center center 0">
      <v-btn
        v-for="action in appBar.actions"
        :key="action.name"
        @click="onClickToolbarAction(action)"
        icon
      >
        <v-icon v-text="action.icon"></v-icon>
      </v-btn>
    </v-scale-transition>
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
