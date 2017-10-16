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

	function clear() {
	    var elems = document.getElementsByClassName("wordbucket-wrapper");
	    for (var k = elems.length - 1; k >= 0; k--) {
	        var parent = elems[k].parentNode;
	        parent.removeChild(elems[k]);
	    }
	}
	
	function removeButton(event) {
		if (event.target.className.indexOf('wordbucket-wrapper') > -1 && wordbucketText) {
			console.log("Saved::" + wordbucketText)
		}
		clear()
	}

	function showButton(event) {
		if (!showInline) return;

	    wordbucketText = getSelectedText()
	    
    	if(!wordbucketText.toString().length) return

    	var wrapperDiv = document.createElement('div')
    	wrapperDiv.className = 'wordbucket-wrapper'
		wrapperDiv.style.top = `${event.pageY+5}px`
		wrapperDiv.style.left = `${event.pageX+5}px`
		
		document.body.appendChild(wrapperDiv);
	}

	document.addEventListener("mouseup", showButton)
	document.addEventListener("mousedown", removeButton)

})();