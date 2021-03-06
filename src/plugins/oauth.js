import Vue from 'vue'
import qs from 'qs'

const OAuth = {
  install (Vue) {
    Vue.prototype.oauth = {
      clearTokenData () {
        window.localStorage.removeItem('tokenData')
      },
      getTokenData () {
        var tokenData = qs.parse(window.location.hash.substr(2))
        if (typeof tokenData.access_token === 'undefined' ||
            typeof tokenData.expires_in === 'undefined' ||
            typeof tokenData.scope === 'undefined') {
          tokenData = JSON.parse(window.localStorage.getItem('tokenData'))
          if (tokenData === null ||
              typeof tokenData.accessToken === 'undefined' ||
              typeof tokenData.expiredAt === 'undefined' ||
              typeof tokenData.scopes === 'undefined' ||
              new Date().getTime() / 1000 > tokenData.expiredAt - 300) {
            this.clearTokenData()
            return null
          } else
            return tokenData
        } else {
          tokenData = {
            accessToken: tokenData.access_token,
            expiredAt: parseFloat(tokenData.expires_in) + new Date().getTime() / 1000,
            scopes: tokenData.scope.split(' ')
          }
          window.localStorage.setItem('tokenData', JSON.stringify(tokenData))
          tokenData.fromHash = true
          return tokenData
        }
      }
    }
  }
}

Vue.use(OAuth)
