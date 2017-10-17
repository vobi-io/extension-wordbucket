function saveTextToAPI(text) {
	alert("Saved::" + text)
}

function translateTextFromAPI(text, callback) {
	const url = 'https://gigabot.ngrok.io/translate?text='+text
	httpGetAsync(url, response => {
		callback(text, JSON.parse(response))
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