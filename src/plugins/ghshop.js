import Vue from 'vue'
import axios from 'axios'

function create_client (token = null) {
  return axios.create({
    baseURL: 'https://ghshop-175009.appspot.com',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const GHShop = {
  install (Vue) {
    Vue.prototype.ghshop = {
      client: null,
      setToken (token) {
        this.client = create_client(token)
      },
      async getMyself () {
        const response = await this.client.get('/myself')
        return response.data
      }
    }
  }
}

Vue.use(GHShop)
