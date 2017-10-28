// self executing function here
(function() {
	// your page initialization code here
	// the DOM will be available here
	let wordbucketText;
	let suggestionLimit;
	let showInline = false;
	let fbUsedId = null;

	chrome.storage.sync.get({
	    inlineEnbaled: true,
	    fbUsedId: null,
	    suggestionLimit: 3,
	  }, function(items) {
	  	showInline =  items.inlineEnbaled
	  	fbUsedId =  items.fbUsedId
	  	suggestionLimit =  items.suggestionLimit
	});

	function getSelectedText() {
	    let text = "";
	    if (window.getSelection) {
	        text = window.getSelection().toString();
	    } else if (document.selection && document.selection.type != "Control") {
	        text = document.selection.createRange().text;
	    }
	    return text
	}

	function getBoundingClientRect(element) {
	  const rect = element.getBoundingClientRect();
	  return {
	    top: rect.top,
	    right: rect.right,
	    bottom: rect.bottom,
	    left: rect.left,
	    width: rect.width,
	    height: rect.height,
	    x: rect.x,
	    y: rect.y
	  };
	}

	function clearButton() {
	    var elems = document.getElementsByClassName("wordbucket-button");
	    for (var k = elems.length - 1; k >= 0; k--) {
	        var parent = elems[k].parentNode;
	        parent.removeChild(elems[k]);
	    }
	}

	function clearPopup() {
	    var elems = document.getElementsByClassName("wordbucket-wrapper");
	    for (var k = elems.length - 1; k >= 0; k--) {
	        var parent = elems[k].parentNode;
	        parent.removeChild(elems[k]);
	    }
	}
	
	function removeButton(event) {
		if (event.target.className.indexOf('wordbucket-button') > -1 && wordbucketText) {
			// console.log("Saved::" + wordbucketText)
			clearPopup()
			translateText(event)
		}

		if (event.target.className.indexOf('wordbucket') == -1) {
			clearPopup()
		}

		clearButton()
	}

	function showButton(event) {
		if (!showInline) return;

	    wordbucketText = getSelectedText()
	    
    	if(!wordbucketText.toString().length) return

    	var button = document.createElement('div')
    	button.className = 'wordbucket-button'
		button.style.top = `${event.pageY+5}px`
		button.style.left = `${event.pageX+5}px`
		button.onclick = translateText
		
		document.body.appendChild(button);
	}

	function saveText(text, translation) {
		clearPopup()
		clearButton()
		if(!fbUsedId) {
			return alert('Please, login into your account.')
		}
		console.log("Save text:::", text, translation, fbUsedId)
	}

	function createListItem(key, value) {
		var listItem = document.createElement('div')
		
		var saveBtn = document.createElement('button')
		saveBtn.className = 'wordbucket-save-button'
		saveBtn.innerText = "Save"
		saveBtn.onclick = function() {
			saveText(key, value)
		}
		listItem.className = 'wordbucket-list-item'
		
		var textRow = document.createElement('span')
		textRow.innerHTML = `<span class="bold">${key}</span> - ${value}`
		
		listItem.appendChild(saveBtn);
		listItem.appendChild(textRow);
		return listItem
	}

	function createPopup(event, text, translation) {
		var wrapperDiv = document.createElement('div')
    	wrapperDiv.className = 'wordbucket-wrapper'
		wrapperDiv.style.top = `${event.pageY+5}px`
		wrapperDiv.style.left = `${event.pageX+5}px`
			
		var contentDiv = document.createElement('div')
		contentDiv.className = 'wordbucket-content'

		translation.dictionary1.map(item => {
			contentDiv.appendChild(createListItem(item.key, item.value));
		})
		
		translation.dictionary2.map(item => {
			contentDiv.appendChild(createListItem(item.key, item.value));
		})

		

		wrapperDiv.appendChild(contentDiv);
		document.body.appendChild(wrapperDiv);
	}

	function translateText(event) {
		translateTextFromAPI(wordbucketText, suggestionLimit, (text, translation) => {
			createPopup(event, text, translation)
		})
	}

	document.addEventListener("mouseup", showButton)
	document.addEventListener("mousedown", removeButton)

	// chrome.commands.onCommand.addListener(function(command) {
	// 	console.log('Command:', command);
	// });

})();