<template>
  <div></div>
</template>
<script>
  import Vue from 'vue'
  import InlineFinder from './InlineFinder'

  // import axios from 'axios'
  import { isEmpty } from 'lodash'
  // import chromeStorage from '../../../ext/chromeStorage'
  import { getSelectedText } from '../../../ext/utils'
  import EventBus from '../../../ext/eventBus'

  export default {
    props: [ 'settings' ],
    data: () => ({
      text: ''
    }),
    computed: { },
    created () {
      this.setupInlineListener()
    },
    mounted () { },
    methods: {
      setupInlineListener () {
        window.addEventListener('mouseup', this.onMouseUp)
        window.addEventListener('mousedown', this.onMouseDown)
      },
      onMouseUp (e) {
        if (!this.settings.showInline) return
        const text = getSelectedText() || ''
        if (isEmpty(text)) return
        if (!text.trim().length) return

        this.text = text

        var ComponentClass = Vue.extend(InlineFinder)
        var instance = new ComponentClass({
          propsData: {
            position: {
              top: `${event.pageY + 5}px`,
              left: `${event.pageX + 5}px`
            },
            settings: this.settings,
            text: text
          }
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
      },
      onMouseDown (e) {
        if (e.target.className.indexOf('wordbucket') === -1) {
          EventBus.$emit('destroyInlineFinder', {})
          EventBus.$emit('destroyInlineDropdown', {})
        }
      }
    }
  }
</script>

<style>
  
</style>