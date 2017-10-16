function saveTextToAPI(text) {
	alert("Saved::" + text)
}

function translateTextFromAPI(text, callback) {
	setTimeout(function() {
		callback(text, text)
	}, 500);
}