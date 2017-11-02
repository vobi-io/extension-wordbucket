var app = new Vue({
 	el: '#app',
	data: {
		default: {
			suggestionLimit: 3,
   			enableInline: true,
   			user: {
   				id: null,
   				first_name: null,
   				last_name: null,
   			}
		},
   		settings: {},
   		text: null,
   		translations: null,
   		saved: false
  	},
  	methods: {
  		getSettings() {
			chrome.storage.sync.get(this.default, (settings) => {
                this.settings = settings
            });
  		},
  		translate(translation, key, index) {
			this.saved = false
  			translateTextFromAPI(this.text, this.settings.suggestionLimit, this.settings.user.id, (text, repsonse) => {
  				this.translations = repsonse
  			})
  		},
  		save(translation) {
  			translation.isLoading = true
  			saveTextToAPI(translation.resourceId, translation.key, translation.value, this.settings.user.id, (repsonse) => {
  				this.translations = null
  				this.saved = true
  				this.text = null
  			})
  		}
  	},
  	created() {
  		this.settings = this.getSettings()
  	}
})