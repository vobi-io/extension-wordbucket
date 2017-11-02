function saveTextToAPI(resourceId, key, value, fbUser) {
    const url = `https://geobot.ge/save`
    const data = {resourceId, key, value, fbUser}
	httpPostAsync(url, data, response => {
		callback(text, JSON.parse(response))
	})
}

function translateTextFromAPI(text, suggestionLimit, userId, callback) {
	// return callback(text, {dictionary1: [{key: text, value:'მაგიდა'}], dictionary2: [{key: text, value:'მაგიდა'},{key: text, value:'მაგიდა'}]})
    const url = `https://geobot.ge/translate?text=${text}&count=${suggestionLimit}&userId=${userId}`
	httpGetAsync(url, response => {
		callback(text, JSON.parse(response))
	})
}

function getFBUserId(accessToken, callback) {
    const url = 'https://graph.facebook.com/me?access_token='+accessToken
	httpGetAsync(url, response => {
		callback(JSON.parse(response))
	})
}

function httpGetAsync(url, callback)
{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpPostAsync(url, data, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}