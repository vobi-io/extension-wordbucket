// import Api from '../ext/api.js'
import { VIDEO_WEB_SITES } from '../ext/constants'

// console.log('background !')

// chrome.contextMenus.create({
//   id: 'wordbucket_selection',
//   title: 'Lookup: %s',
//   contexts: ['selection']
// })

// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//   console.log(info.selectionText)

//   const data = await Api.translate(info.selectionText)
//   const translations = [...data.dictionary1, ...data.dictionary2]

//   console.log(translations)
// })

const extractHostname = (url) => {
  var hostname
  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]

  return hostname
}

const extractRootDomain = (url) => {
  var domain = extractHostname(url)
  var splitArr = domain.split('.')
  var arrLen = splitArr.length

  // extracting the root domain here
  // if there is a subdomain
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]
    // check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
      // this is using a ccTLD
      domain = splitArr[arrLen - 3] + '.' + domain
    }
  }
  return domain
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.tabs.getSelected(null, function (tab) {
    var domain = extractRootDomain(tab.url)
    if (VIDEO_WEB_SITES.includes(domain)) {
      chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'SETUP_VIDEO_TRANSLATOR', domain: domain})
      })
    }
  })
})
