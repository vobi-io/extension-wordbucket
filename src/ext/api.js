import axios from 'axios'
import { isEmpty } from 'lodash'
import chromeStorage from './chromeStorage'

const API_URL = `https://apiword.vobi.io`

const defaultSettings = {
  suggestionLimit: 3,
  showInline: true,
  sources: {
    google: true,
    translate_ge: true,
    glosbe: true
  }
}

const _getLocalStorage = async () => {
  const result = {
    settings: defaultSettings,
    user: {}
  }
  const settings = await chromeStorage.get('settings')
  if (!isEmpty(settings)) {
    result.settings = settings
  }
  const user = await chromeStorage.get('user')
  if (!isEmpty(user)) {
    result.user = user
  }

  return result
}

export default {
  login (data) {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${API_URL}/sign-in`
        const result = await axios.post(url, data)
        resolve(result.data)
      } catch (e) {
        reject(e)
      }
    })
  },
  translate (text) {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = await _getLocalStorage()
        if (!storage.user.id) {
          alert('You must log in Wordbucket, to use it!')
          return reject(new Error('No user!'))
        }
        const url = `${API_URL}/translate?text=${text}&count=${storage.settings.suggestionLimit}&userId=${storage.user.id}`
        const result = await axios.get(url)
        resolve(result.data)
      } catch (e) {
        reject(e)
      }
    })
  },
  save ({ resourceId, key, value }) {
    return new Promise(async (resolve, reject) => {
      try {
        const storage = await _getLocalStorage()
        if (!storage.user.id) {
          alert('You must log in Wordbucket, to use it!')
          return reject(new Error('No user!'))
        }

        const url = `${API_URL}/save`
        const data = {resourceId, key, value, user: storage.user.id}
        const result = await axios.post(url, data)
        resolve(result.data)
      } catch (e) {
        reject(e)
      }
    })
  }
}
