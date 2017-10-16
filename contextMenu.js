function handleSelection(info, tab) {
    saveTextToAPI(info.selectionText)
}

chrome.contextMenus.create({
  // title: "Save: %s", 
  title: "Save to WordBucket", 
  contexts:["selection"], 
  onclick: handleSelection,
});