function toggleExtension(tab) {
  if (tab.url.includes('calendar.google.com')) {
    chrome.pageAction.show(tab.id);
    console.log(tab.id);
    chrome.tabs.executeScript(null, {
      file: 'content.js'
    })    
  } else {
    chrome.pageAction.hide(tab.id);
  }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, toggleExtension)
});

chrome.tabs.onCreated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, toggleExtension)
})
