import Vue from 'vue'
import axios from 'axios'

const levelNumbers = {
  Owner: 3,
  Manager: 2,
  Clerk: 1,
  Guest: 0
}

function create_client (token = null) {
  return axios.create({
    baseURL: 'https://ghshop-175009.appspot.com',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

function assignLevelNumber (user) {
  user.levelNumber = levelNumbers[user.level]
  return user
}

const GHShop = {
  install (Vue) {
    Vue.prototype.ghshop = {
      client: null,
      tokenData: null,
      queue: [],
      setTokenData (tokenData) {
        this.tokenData = tokenData
        this.client = create_client(tokenData.accessToken)
        for (var request of this.queue)
          this.request(request.method, request.url, request.data).then(request.resolve)
        this.queue = []
      },
      async getMyself () {
        const me = await this.get('/myself')
        return assignLevelNumber(me)
      },
      async getUsers () {
        const users = await this.get('/users')
        for (var user of users)
          assignLevelNumber(user)
        return users
      },
      async putUser (user) {
        user = await this.put(`/users/${user.id}`, {
          level: user.level
        })
        return assignLevelNumber(user)
      },
      async getArtists () {
        const artists = await this.get('/artists')
        return artists
      },
      async get (url) {
        return await this.request('GET', url)
      },
      async post (url, data) {
        return await this.request('POST', url, data)
      },
      async put (url, data) {
        return await this.request('PUT', url, data)
      },
      async delete (url) {
        return await this.request('DELETE', url)
      },
      request (method, url, data = null) {
        return new Promise(async (resolve) => {
          if (this.client) {
            const response = await this.client.request({
              method,
              url,
              data
            })
            resolve(response.data)
          } else
            this.queue.push({
              method,
              url,
              data,
              resolve
            })
        })
      }
    }
  }
}

Vue.use(GHShop)
