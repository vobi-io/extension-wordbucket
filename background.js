// self executing function here
(function() {
	// your page initialization code here
	// the DOM will be available here
	let wordbucketText;
	let showInline = false;

	chrome.storage.sync.get({
	    inlineEnbaled: true
	  }, function(items) {
	  	showInline =  items.inlineEnbaled
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
			console.log("Saved::" + wordbucketText)
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
		console.log("Save text:::", text, translation)
	}

	function createPopup(event, text, translation) {
		var wrapperDiv = document.createElement('div')
    	wrapperDiv.className = 'wordbucket-wrapper'
		wrapperDiv.style.top = `${event.pageY+5}px`
		wrapperDiv.style.left = `${event.pageX+5}px`
			
		var contentDiv = document.createElement('div')
    	contentDiv.className = 'wordbucket-content'

		var textRow = document.createElement('span')
		textRow.innerText = text
		contentDiv.appendChild(textRow);

		var hr = document.createElement('div')
    	hr.className = 'wordbucket-hr'
		contentDiv.appendChild(hr);

		var textRow = document.createElement('span')
		textRow.innerText = translation
		contentDiv.appendChild(textRow);

		var saveBtn = document.createElement('button')
    	saveBtn.className = 'wordbucket-save-button'
		saveBtn.innerText = "Save"
		saveBtn.onclick = function() {
			saveText(text, translation)
		}
		contentDiv.appendChild(saveBtn);

		wrapperDiv.appendChild(contentDiv);
		document.body.appendChild(wrapperDiv);
	}

	function translateText(event) {
		translateTextFromAPI(wordbucketText, (text, translation) => {
			createPopup(event, text, translation)
		})
	}

	document.addEventListener("mouseup", showButton)
	document.addEventListener("mousedown", removeButton)

})();