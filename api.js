function saveTextToAPI(text) {
	alert("Saved::" + text)
}

function translateTextFromAPI(text, callback) {
	return callback(text, {dictionary1: [{key: text, value:'მაგიდა'}], dictionary2: [{key: text, value:'მაგიდა'},{key: text, value:'მაგიდა'}]})
    const url = 'https://gigabot.ngrok.io/translate?text='+text
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