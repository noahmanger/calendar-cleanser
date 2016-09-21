'use strict';

function checkChildren(calEvent, type) {
  var check;

  if (type === 'no') {
    check = calEvent.querySelector('.rsvp-no');
  } else if (type === 'maybe') {
    check = calEvent.querySelector('[title="Responded maybe"]');
  } else if (type === 'noRSVP') {
    check = calEvent.querySelector('[title="Not yet responded"]');
  }

  return check;
}

function toggleEvents(action, type) {
  var calEvents = document.querySelectorAll('.tg-col dl');

  [].forEach.call(calEvents, function(calEvent) {
    var check = checkChildren(calEvent, type);

    if (check && action === 'hide') {
      calEvent.classList.add('calendar-cleanser--hidden');
    } else if (check && action === 'show') {
      calEvent.classList.remove('calendar-cleanser--hidden');
    }
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    toggleEvents(request.action, request.rsvpType);
  }
);
