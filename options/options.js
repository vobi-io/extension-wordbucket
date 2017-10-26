var defaultConfig = {
    inlineEnbaled: true,
}

// Saves options
function save_options() {
    var inlineEnbaled = document.getElementById('inline').checked;

    store_options({
        inlineEnbaled: inlineEnbaled
    })
}

// Saves options to chrome.storage
function reset_options() {
    store_options(defaultConfig, function() {
        restore_options()
    })
}

// Saves options to chrome.storage
function store_options(options, callback) {
    chrome.storage.sync.set(options, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('saveStatus');
        status.textContent = 'Options saved.';
        status.style.display = "inline-block";
        setTimeout(function() {
            status.textContent = '';
            status.style.display = "none";
        }, 750);

        if (callback) callback()
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and inlineEnbaled = true.
    chrome.storage.sync.get({
        inlineEnbaled: true
    }, function(items) {
        document.getElementById('inline').checked = items.inlineEnbaled;
    });
}

// facebook logout
function fbLogout() {
    localStorage.clear();
    chrome.storage.sync.remove(["fbUsedId","user"],function(){
        const error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }

        renderLoginLogout()
    })
}

// Show/Hide user login
function renderLoginLogout() {
    // Check auth user
    chrome.storage.sync.get({
        "fbUsedId": null,
        "user": null,
    }, function(items){
        let user = 'none'
        let logout = 'block'
        if (items.fbUsedId) {
            user = 'block'
            logout = 'none'
            document.getElementById('username').innerText = items.user
        }
        document.getElementById('username').style.display = user
        document.getElementById('fbLogout').style.display = user
        document.getElementById('fbLogin').style.display = logout
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveBtn').addEventListener('click', save_options);
document.getElementById('resetBtn').addEventListener('click', reset_options);
document.getElementById('fbLogout').addEventListener('click', fbLogout);


(function() {
    // your page initialization code here
    // the DOM will be available here
    var successURL = 'https://www.facebook.com/connect/login_success.html';
    function onFacebookLogin() {
        if (!localStorage.accessToken) {
            chrome.tabs.getAllInWindow(null, function(tabs) {
                for (var i = 0; i < tabs.length; i++) {
                    if (tabs[i].url.indexOf(successURL) == 0) {
                        var params = tabs[i].url.split('#')[1];
                        access = params.split('&')[0].split('=')[1]
                        localStorage.accessToken = access;
                        chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                        getFBUserId(access, response => {
                            chrome.storage.sync.set({
                                "fbUsedId": response.id,
                                "user": response.name,
                            }, function(){
                                renderLoginLogout()
                            });
                        })
                        return;
                    }
                }
            });
        }
    }
    // Set listener
    chrome.tabs.onUpdated.addListener(onFacebookLogin);

    // Check login/logout buttons
    renderLoginLogout()
    
 })();