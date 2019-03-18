// var content = chrome.extension.getURL('js/content.js')
// var script = document.createElement('script')
// script.setAttribute('type', 'text/javascript')
// script.setAttribute('src', content)
// const vueContainer = document.createElement('div')
// vueContainer.setAttribute('id', 'wordbucket-root')
// document.body.appendChild(vueContainer)
// document.body.appendChild(script)

import Vue from 'vue'
import root from './root.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#wordbucket-root',
//   render: h => h(root)
// })

var ComponentClass = Vue.extend(root)
var instance = new ComponentClass()
instance.$mount()
document.body.appendChild(instance.$el)
