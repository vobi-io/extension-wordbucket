// self executing function here
// (function() {
	// your page initialization code here
	// the DOM will be available here
	let wordbucketText;
	function saveText(text, translation) {
		// clearPopup()
		// clearButton()
		console.log("Save text:::", text, translation)
	}

	function renderResults(event, text, translation) {
		var wrapperDiv = document.createElement('div')
    	wrapperDiv.className = 'wordbucket-wrapper'
		wrapperDiv.style.top = `${event.pageY+5}px`
		wrapperDiv.style.left = `${event.pageX+5}px`
			
		var contentDiv = document.createElement('div')
    	contentDiv.className = 'wordbucket-content'

		var textRow = document.createElement('span')
    	textRow.className = 'wordbucket-target'
		textRow.innerText = text
		contentDiv.appendChild(textRow);

		var hr = document.createElement('div')
    	hr.className = 'wordbucket-hr'
		contentDiv.appendChild(hr);

		translation.dictionary1.map(item => {
			var textRow = document.createElement('span')
			textRow.innerText = item.value
			contentDiv.appendChild(textRow);
		})

		var hr = document.createElement('div')
    	hr.className = 'wordbucket-hr'
		contentDiv.appendChild(hr);

		translation.dictionary2.map(item => {
			var textRow = document.createElement('span')
			textRow.innerText = `${item.key} - ${item.value}`
			contentDiv.appendChild(textRow);
		})

		var saveBtn = document.createElement('button')
    	saveBtn.className = 'wordbucket-save-button'
		saveBtn.innerText = "Save"
		saveBtn.onclick = function() {
			saveText(text, translation)
		}

		wrapperDiv.appendChild(contentDiv);
		wrapperDiv.appendChild(saveBtn);
		document.getElementsById('results').appendChild(wrapperDiv);
	}

	function translateText(event) {
		// alert()
		translateTextFromAPI(document.getElementById('text').value, (text, translation) => {
			renderResults(event, text, translation)
			// console.log(event, text, translation)
		})
	}

	document.getElementById('translate').addEventListener("click", translateText)

// })();