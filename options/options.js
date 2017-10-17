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

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('saveBtn').addEventListener('click', save_options);
document.getElementById('resetBtn').addEventListener('click', reset_options);