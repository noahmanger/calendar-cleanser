var scriptAdded;

function toggleExtension(tab) {
  if (typeof tab.url === 'undefined') { return false; }

  if (tab.url.includes('calendar.google.com')) {
    chrome.pageAction.show(tab.id);
    chrome.tabs.executeScript(tab.id, {
      file: 'content.js'
    });
    chrome.tabs.insertCSS(tab.id, {
      file: 'content.css'
    });
    scriptAdded = true;
  } else {
    chrome.pageAction.hide(tab.id);
  }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  // Only add the script if it hasn't been
  if (!scriptAdded) {
    chrome.tabs.get(activeInfo.tabId, toggleExtension);
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.get(tabId, toggleExtension);
  }
});
