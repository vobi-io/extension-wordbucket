function handleSelection(info, tab) {
	saveTextToAPI(info.selectionText)
}

chrome.contextMenus.create({
  // title: "Save: %s", 
  title: "Open with WordBucket", 
  contexts:["selection"], 
  onclick: handleSelection
});