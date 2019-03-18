export default {
  get (key) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, (val) => {
          resolve(val[key])
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  set (key, val) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.set({[key]: val}, () => {
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  remove (key) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.remove(key, () => {
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  clear () {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.clear(() => {
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}
