import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './views/MainPage.vue'
import UserList from './views/UserList.vue'
import ArtistList from './views/ArtistList.vue'
import ArtistPage from './views/ArtistPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: MainPage
    },
    {
      path: '/users',
      name: 'user-list',
      component: UserList
    },
    {
      path: '/artists',
      name: 'artist-list',
      component: ArtistList
    },
    {
      path: '/artist/:id',
      name: 'artist-page',
      component: ArtistPage,
      props: true
    }
  ]
})
