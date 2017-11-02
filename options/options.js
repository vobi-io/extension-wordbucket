var app = new Vue({
    el: '#app',
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
        settings: {
            // suggestionLimit: 2,
            // inlineEnbaled: true,
        },
        showNotification: false,
        successURL: 'https://www.facebook.com/connect/login_success.html'
    },
    computed: {
        numbers() {
            const numbers = []
            for (var i = 1; i < 10; i++) {
                numbers.push(i)
            }
            return numbers
        },
        name() {
            return this.settings.user.first_name +' '+this.settings.user.last_name
        }
    },
    methods: {
        save() {
            this.storeOptions()
        },
        reset() {
            const user = this.settings.user
            this.settings = Object.assign({}, {}, this.default)
            this.settings.user = user
            this.storeOptions()
        },
        storeOptions() {
            chrome.storage.sync.set(this.settings, () => {
                this.showNotification = true
                setTimeout(() => { this.showNotification = false }, 1000);
            });
        },
        getOptions(callback) {
            chrome.storage.sync.get(this.default, (settings) => {
                callback(settings)
            });
        },
        // login() {
        //     this.settings.user = {
        //         id: 123,
        //         first_name: 'shalva',
        //         last_name: 'gegia',
        //     }
        //     this.storeOptions()
        // },
        logout() {
            localStorage.clear();
            localStorage.accessToken = '';
            this.settings.user = {}
            this.storeOptions()
        },
        httpGetAsync(url, callback) {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() { 
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.responseText);
            }
            xmlHttp.open("GET", url, true); // true for asynchronous 
            xmlHttp.send(null);
        },
        getFBUserId(accessToken, callback){
            const url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token='+accessToken
            this.httpGetAsync(url, response => {
                callback(JSON.parse(response))
            })
        },
        onFbLogin() {
            if (!localStorage.accessToken) {
                const self = this
                chrome.tabs.getAllInWindow(null, function(tabs) {
                    for (var i = 0; i < tabs.length; i++) {
                        if (tabs[i].url.indexOf(app.successURL) == 0) {
                            var params = tabs[i].url.split('#')[1];
                            access = params.split('&')[0].split('=')[1]
                            localStorage.accessToken = access;
                            chrome.tabs.onUpdated.removeListener(self.onFbLogin);
                            self.getFBUserId(access, response => {
                                self.settings.user = response
                                self.storeOptions()
                            })
                            return;
                        }
                    }
                });
            }
        }
    },
    created() {
        chrome.tabs.onUpdated.addListener(this.onFbLogin);
        this.getOptions(settings => this.settings = settings)
    }
})