<template>
  <div></div>
</template>
<script>
import Vue from 'vue'
// import EventBus from '../../../ext/eventBus'
import VideoModal from './VideoModal'
import { VIDEO_WEB_SITES_CONFIG } from '../../../ext/constants.js'

export default {
  props: [ 'settings', 'domain' ],
  data: () => ({
    text: '',
    domainConfig: {}
  }),
  computed: { },
  methods: {
    init () {
      let timer = null

      timer = setInterval(() => {
        const videoElm = document.querySelector(this.domainConfig.videoTag)

        if (videoElm) {
          clearInterval(timer)

          videoElm.addEventListener('pause', this.onVideoPause(this.domainConfig.videoTag, this.domainConfig.captionTag, this.domainConfig.containerTag))

          // document.onkeydown = function checkKey (e) {
          //   e = e || window.event
          //   if (e.keyCode == '37') {
          //     videoElm.currentTime -= 5
          //   } else if (e.keyCode == '39') {
          //     videoElm.currentTime += 5
          //   } else if (e.keyCode == '32') {
          //     e.preventDefault()
          //     if (videoElm.paused) {
          //       videoElm.play()
          //     } else {
          //       videoElm.pause()
          //     }
          //   }
          // }
        }
      }, 1000)
    },
    onVideoPause (videoQuerySelector, subtitlesQuerySelector, playerWrapperQuerySelector) {
      return (e) => {
        let text = document.querySelector(subtitlesQuerySelector).innerText || ''
        text = text.trim()
        if (!text.length) return

        if (document.querySelector('#wordbucket-video-model')) return

        var ComponentClass = Vue.extend(VideoModal)
        var instance = new ComponentClass({
          propsData: {
            text: text,
            settings: this.settings,
            domain: this.domain,
            videoTag: videoQuerySelector
          }
        })
        instance.$mount()
        document.querySelector(playerWrapperQuerySelector).appendChild(instance.$el)
      }
    }
  },
  created () {
    this.domainConfig = VIDEO_WEB_SITES_CONFIG[this.domain]

    this.init()
  }
}
</script>

<style></style>