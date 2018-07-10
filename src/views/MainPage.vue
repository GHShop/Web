<template>
  <v-jumbotron color="light-blue lighten-5" height="100%">
    <v-container>
      <v-layout class="my-4">
        <v-flex text-xs-center>
          <h1 class="display-2">Welcome to GHShop</h1>
          <span class="headline grey--text text--darken-1">Please log in.</span>
        </v-flex>
      </v-layout>
      <v-layout wrap class="my-4">
        <v-flex xs4 text-xs-center>
          <v-icon large>credit_card</v-icon>
          <h3>For Clerk</h3>
          <v-btn color="info" href="https://pineauth-177914.appspot.com/oauth/authorize?response_type=token&scope=ghshop.sell&client_id=B7S9mUDYgtRTBYOzT82SXZVZE45VjRNOw2J8avEBh04&redirect_uri=http://192.168.0.2:8080/">Log in</v-btn>
        </v-flex>
        <v-flex xs4 text-xs-center>
          <v-icon large>business</v-icon>
          <h3>For Manager</h3>
          <v-btn color="info" href="https://pineauth-177914.appspot.com/oauth/authorize?response_type=token&scope=ghshop.manage%20ghshop.sell&client_id=B7S9mUDYgtRTBYOzT82SXZVZE45VjRNOw2J8avEBh04&redirect_uri=http://192.168.0.2:8080/">Log in</v-btn>
        </v-flex>
        <v-flex xs4 text-xs-center>
          <v-icon large>settings</v-icon>
          <h3>For Owner</h3>
          <v-btn color="info" href="https://pineauth-177914.appspot.com/oauth/authorize?response_type=token&scope=ghshop.own%20ghshop.manage%20ghshop.sell&client_id=B7S9mUDYgtRTBYOzT82SXZVZE45VjRNOw2J8avEBh04&redirect_uri=http://192.168.0.2:8080/">Log in</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
  name: 'main-page'
}
</script>
