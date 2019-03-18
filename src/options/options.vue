<template>
  <el-container>
    <el-header>
      <el-row type="flex" class="row-bg" justify="center">
        <h2>Wordbucket Settings</h2>
      </el-row>
    </el-header>
    <el-main>
      <el-card class="main-continer">
        <el-container>
          <el-form ref="form" :model="settings" label-width="200px">
            <el-form-item label="Facebook Login">
              <a target="_blank"
                  v-show="!user.id"
                  href="https://www.facebook.com/dialog/oauth?client_id=1764871037166841&response_type=token&scope=email&redirect_uri=https://www.facebook.com/connect/login_success.html">
                <el-button type="primary">Login with Facebook</el-button>
              </a>
              <el-button v-show="user.id" type="default">{{user.firstName}}</el-button>
              <el-button v-show="user.id" @click="logout" type="default">Logout</el-button>
            </el-form-item>

            <el-form-item label="Suggestion Limit">
              <el-select v-model="settings.suggestionLimit" placeholder="Suggestion Limit">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Enable inline">
              <el-switch v-model="settings.showInline"></el-switch>
            </el-form-item>
            
            <el-form-item label="Sourse 1 (Google Translate)">
              <el-switch v-model="settings.sources.google"></el-switch>
            </el-form-item>
            <el-form-item label="Sourse 2 (Translate.ge)">
              <el-switch v-model="settings.sources.translate_ge"></el-switch>
            </el-form-item>
            <el-form-item label="Sourse 2 (Glosbe)">
              <el-switch v-model="settings.sources.glosbe"></el-switch>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" icon="el-icon-check" @click="onSubmit">Save</el-button>
              <el-button icon="el-icon-refresh">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-container>
      </el-card>
    </el-main>
    <el-footer>
      <el-row type="flex" class="row-bg" justify="center">
        <p>© Vobi.io - <a href="https://github.com/vobi-io/extension-wordbucket" target="blank">Github</a></p>
      </el-row>
    </el-footer>
  </el-container>
</template>
<script>
  import axios from 'axios'
  import { isEmpty } from 'lodash'
  import chromeStorage from '../ext/chromeStorage'
  import Api from '../ext/api.js'
  export default {
    data: () => ({
      defaults: {
        suggestionLimit: 3,
        showInline: true,
        sources: {
          google: true,
          translate_ge: true,
          glosbe: true
        }
      },
      settings: {
        suggestionLimit: 3,
        showInline: true,
        sources: {
          google: true,
          translate_ge: true,
          glosbe: true
        }
      },
      user: {},
      loginSuccessURL: 'https://www.facebook.com/connect/login_success.html'
    }),
    computed: { },
    created () {
      this.settings = this.defaults
      this.getOptions()
      chrome.tabs.onUpdated.addListener(this.onFbLogin)
    },
    mounted () { },
    methods: {
      onSubmit () {
        this.saveOptions()
        this.notify('Settings successfully saved!')
      },
      onReset () {
        this.settings = this.defaults
        this.onSubmit()
      },
      async getOptions () {
        const settings = await chromeStorage.get('settings')
        if (!isEmpty(settings)) {
          this.settings = settings
        }
        const user = await chromeStorage.get('user')
        if (!isEmpty(user)) {
          this.user = user
        }
      },
      saveOptions () {
        chromeStorage.set('settings', this.settings)
        chromeStorage.set('user', this.user)
      },
      notify (message) {
        this.$notify({
          title: 'Success',
          message: message,
          type: 'success'
        })
      },
      logout () {
        localStorage.clear()
        localStorage.accessToken = ''
        this.user = {}
        this.saveOptions()
        this.notify('You`ve been successfully logged out!')
      },
      async getFBUserId (accessToken) {
        const url = `https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token=${accessToken}`
        const response = await axios.get(url)
        const params = {
          ...response.data,
          fbId: response.data.id,
          firstName: response.data.first_name,
          lastName: response.data.last_name
        }
        const user = await Api.login(params)
        // console.log(user)
        this.user = {
          ...user,
          id: user._id
        }
        // this.user = response.data
        this.notify('You`ve been successfully logged in!')
        this.saveOptions()
      },
      onFbLogin () {
        if (!localStorage.accessToken) {
          const self = this
          chrome.tabs.getAllInWindow(null, (tabs) => {
            for (var i = 0; i < tabs.length; i++) {
              if (tabs[i].url.indexOf(self.loginSuccessURL) === 0) {
                var params = tabs[i].url.split('#')[1]
                var access = params.split('&')[0].split('=')[1]
                localStorage.accessToken = access
                chrome.tabs.onUpdated.removeListener(self.onFbLogin)
                self.getFBUserId(access)
                return
              }
            }
          })
        }
      }
    }
  }
</script>

<style>

.main-continer {
  max-width: 1000px;
  margin: auto;
}
  
</style>