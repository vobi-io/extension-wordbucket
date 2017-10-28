// self executing function here
(function() {

	let fbUsedId = null;

	chrome.storage.sync.get({
	    fbUsedId: null,
	  }, function(items) {
	  	fbUsedId =  items.fbUsedId
	});

	// your page initialization code here
	// the DOM will be available here
	let wordbucketText;
	function saveText(text, translation) {
		console.log("Save text:::", text, translation, fbUsedId)

		document.getElementById('results').innerHTML = '';
		var status = document.getElementById('saveStatus');
        status.textContent = 'Word saved.';
        status.style.display = "inline-block";
        setTimeout(function() {
            status.textContent = '';
            status.style.display = "none";
        }, 750);
	}

	function createListItem(key, value) {
		var listItem = document.createElement('li')
		listItem.className = 'list-group-item'
		
		var saveBtn = document.createElement('button')
		saveBtn.className = 'btn btn-sm btn-light'
		saveBtn.innerText = "Save"
		saveBtn.onclick = function() {
			saveText(key, value)
		}
		listItem.className = 'list-group-item'
		
		var textRow = document.createElement('span')
		textRow.innerHTML = `<span class="bold">${key}</span> - ${value}`
		
		listItem.appendChild(saveBtn);
		listItem.appendChild(textRow);
		return listItem
	}

	function renderResults(event, text, translation) {
		document.getElementById('results').innerHTML = ''

		var wrapperDiv = document.createElement('div')
    	wrapperDiv.className = 'wordbucket-wrapper'
			
		var contentDiv = document.createElement('ul')
		contentDiv.className = 'list-group'

		translation.dictionary1.map(item => {
			contentDiv.appendChild(createListItem(item.key, item.value));
		})
		
		translation.dictionary2.map(item => {
			contentDiv.appendChild(createListItem(item.key, item.value));
		})

		wrapperDiv.appendChild(contentDiv);
		document.getElementById('results').appendChild(contentDiv);
	}

	function translateText(event) {
		// alert()
		translateTextFromAPI(document.getElementById('text').value, (text, translation) => {
			renderResults(event, text, translation)
			// console.log(event, text, translation)
		})
	}

	document.getElementById('form').addEventListener('submit', function(event){
		event.preventDefault();
		translateText(event)
	})

})();