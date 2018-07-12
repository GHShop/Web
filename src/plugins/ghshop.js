import Vue from 'vue'
import axios from 'axios'
import toast from './toast'

const levelNumbers = {
  Owner: 3,
  Manager: 2,
  Clerk: 1,
  Guest: 0
}

const toastMessages = {
  POST: 'Created',
  PUT: 'Updated',
  DELETE: 'Deleted'
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

function assignCan (user, scopes) {
  var can = {
    own: false,
    manage: false,
    sell: false
  }
  if (user.levelNumber >= 3 && scopes.includes('ghshop.own'))
    can.own = true
  if (user.levelNumber >= 2 && scopes.includes('ghshop.manage'))
    can.manage = true
  if (user.levelNumber >= 1 && scopes.includes('ghshop.sell'))
    can.sell = true
  user.can = can
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
        return assignCan(assignLevelNumber(me), this.tokenData.scopes)
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
        return await this.get('/artists')
      },
      async postArtist (artist) {
        return await this.post('/artists', artist)
      },
      async putArtist (artist) {
        return await this.put(`/artists/${artist.id}`, artist)
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
            toast.dismiss()
            try {
              const response = await this.client.request({
                method,
                url,
                data
              })
              if (toastMessages[method])
                toast.success(toastMessages[method])
              resolve(response.data)
            } catch (error) {
              if (error.response && error.response.data.error_description)
                toast.error(error.response.data.error_description)
              else
                toast.error('Something went wrong.')
            }
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
