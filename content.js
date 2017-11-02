var EventBus = new Vue({})

const Finder = Vue.extend({
	template: `<div class="wordbucket-button" v-bind:style="style" @click="translate($event)"></div>`,
	methods: {
		translate(event) {
			EventBus.$emit('translate', {event: event});
			this.$destroy(true)
		}
	},
	created() {
        EventBus.$on('destroyFinder', () => this.$destroy(true) );
    },
});

const Translations = Vue.extend({
	template: `
		<div class="wordbucket-wrapper" v-bind:style="style">
			<div class="wordbucket-content" v-bind:style="style">
				<div class="wordbucket-list-item" v-for="translation in translations.dictionary1">
					<button class="wordbucket-save-button" @click="save(translation)">save</button>
					<span class="bold">{{translation.key}}</span> - {{translation.value}}
				</div>
				<div class="wordbucket-list-item" v-for="translation in translations.dictionary2">
					<button class="wordbucket-save-button" @click="save(translation)">save</button>
					<span class="bold">{{translation.key}}</span> - {{translation.value}}
				</div>
			</div>
		</div>
	`,
	methods: {
		save(translation) {
			EventBus.$emit('save', {translation: translation});
			this.$destroy(true)
		}
	},
	created() {
		// const self = this
        EventBus.$on('destroyFinder', () => this.$destroy(true) );
    },
});

var app = new Vue({
 	// el: '#app',
	data: {
		default: {
			suggestionLimit: 3,
   			inlineEnbaled: true,
   			user: {
   				id: null,
   				first_name: null,
   				last_name: null,
   			}
		},
   		text: null,
   		translations: null,
   		saved: false
  	},
  	methods: {
  		getSettings() {
			chrome.storage.sync.get(this.default, (settings) => {
                console.log( settings )
                this.settings = settings
            });
  		},
  		translate(event) {
  			translateTextFromAPI(this.text, this.settings.suggestionLimit, this.settings.user.id, (text, repsonse) => {
  				this.translations = repsonse
  				var finder = new Translations({
					data: {
						style: {
							top: `${event.pageY+5}px`,
							left: `${event.pageX+5}px`,
						},
						translations: this.translations
					}
				}).$mount()
				document.body.appendChild(finder.$el)
  			})
  		},
  		save(translation) {
  			saveTextToAPI(translation.resourceId, translation.key, translation.value, this.settings.user.id, (repsonse) => {
  				this.translations = null
  				this.saved = true
  				this.text = null
  			})
  		},
  		getSelectedText() {
		    let text = "";
		    if (window.getSelection) {
		        text = window.getSelection().toString();
		    } else if (document.selection && document.selection.type != "Control") {
		        text = document.selection.createRange().text;
		    }
		    return text
		},
  		mouseUp(event) {
  			if(!this.settings.inlineEnbaled) return
  			const text = this.getSelectedText()
     		if (!text || text == "" || text == " ") return
     		this.text = this.getSelectedText()

			var finder = new Finder({
				data: {
					style: {
						top: `${event.pageY+5}px`,
						left: `${event.pageX+5}px`,
					}
				}
			}).$mount()
			document.body.appendChild(finder.$el)
  		},
  		mouseDown(event) {
  			if (event.target.className.indexOf('wordbucket') == -1) {
				// clearPopup()
				// this.$broadcast('destroy')
				EventBus.$emit('destroyFinder', {});
			}
  		}
  	},
  	created() {
  		this.settings = this.getSettings()

  		EventBus.$on('translate', (data) => {
			this.translate(data.event)
  		} );

  		EventBus.$on('save', (data) => {
			this.save(data.translation)
  		} );

  		document.addEventListener("mouseup", this.mouseUp)
		document.addEventListener("mousedown", this.mouseDown)
  	}
});