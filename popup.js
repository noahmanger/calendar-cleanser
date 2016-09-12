'use strict';

var buttons = document.querySelectorAll('button');

[].forEach.call(buttons, function(button) {
  button.addEventListener('click', function() {
    var action = this.getAttribute('data-action');
    var type = this.getAttribute('data-type');

    // Toggle the ation on the button
    var toggleAction = action === 'hide' ? 'show' : 'hide';
    this.setAttribute('data-action', toggleAction);

    // Send a message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: action,
        rsvpType: type}
      );
    });
  });
})
