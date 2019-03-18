<template>
  <div></div>
</template>
<script>
  // import axios from 'axios'
import { isEmpty } from 'lodash'
import chromeStorage from '../ext/chromeStorage'

import Vue from 'vue'
import InlineTranslator from './components/InlineTranslator/InlineTranslator'
import VideoTranslator from './components/VideoTranslator/VideoTranslator'

export default {
    name: 'wordbucket',
    components: {
      InlineTranslator
    },
    data: () => ({
      settings: {
        suggestionLimit: 3,
        showInline: true,
        sources: {
          google: true,
          translate_ge: true,
          glosbe: true
        }
      }
    }),
    computed: { },
    async created () {
      await this.getSettings()
      this.setupInlineTranslator()
      this.setupVideoTranslator()
    },
    mounted () { },
    methods: {
      async getSettings () {
        const settings = await chromeStorage.get('settings')
        if (!isEmpty(settings)) {
          this.settings = settings
        }
        return this.settings
      },
      setupInlineTranslator () {
        var ComponentClass = Vue.extend(InlineTranslator)
        var instance = new ComponentClass({
          propsData: { settings: this.settings }
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
      },
      setupVideoTranslator () {
        chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
          if (msg.action === 'SETUP_VIDEO_TRANSLATOR') {
            var ComponentClass = Vue.extend(VideoTranslator)
            var instance = new ComponentClass({
              propsData: { settings: this.settings, ...msg }
            })
            instance.$mount()
            document.body.appendChild(instance.$el)
          }
        })
      }
    }
  }
</script>

<style>
  
</style>