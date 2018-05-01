/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

function letsDoThis(data){
  browser.notifications.create({
    "type": "basic",
    "title": "PING",
    "message": "THIS WORKS"
  })
}

browser.runtime.onMessage.addListener(letsDoThis);

/*
Send message from content to bg
*/

function handleMessage(request, sender, sendResponse) {
  console.log("message from content script" + request.greeting);
  sendResponse({response: "Response from Background Script"});
}

browser.runtime.onMessage.addListener(handleMessage);

/*
send message from background script to content script to alter text on page 
*/
//first get the tab we're on 
browser.tabs.onUpdated.addListener(function(tabId){
  browser.pageAction.show(tabId)
})
//then get a click as an action
browser.pageAction.onClicked.addListener(sendData)
//then we send data to content script
//when we send data from background script to content script it MUST go to a specific tab : so must use tabId
function sendData(tab){
  browser.tabs.sendMessage(tab.id, {data: 'dummyData'})
}



/*
Create all the context menu items.
*/
browser.menus.create({
  id: "log-selection",
  title: browser.i18n.getMessage("menuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);

browser.menus.create({
  id: "remove-me",
  title: browser.i18n.getMessage("menuItemRemoveMe"),
  contexts: ["all"]
}, onCreated);

browser.menus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);
 
browser.menus.create({
  id: "separator-2",
  type: "separator",
  contexts: ["all"]
}, onCreated);

var checkedState = true;


browser.menus.create({
  id: "open-sidebar",
  title: browser.i18n.getMessage("menuItemOpenSidebar"),
  contexts: ["all"],
  command: "_execute_sidebar_action",
  checked: checkedState,
  type: "checkbox"
}, onCreated);

browser.menus.create({
  id: "tools-menu",
  title: browser.i18n.getMessage("menuItemToolsMenu"),
  contexts: ["tools_menu"],
}, onCreated);


/*
Toggle checkedState, and update the menu item's title
appropriately.

Note that we should not have to maintain checkedState independently like
this, but have to because Firefox does not currently pass the "checked"
property into the event listener.
*/
function updateCheckUncheck() {
  checkedState = !checkedState;
  if (checkedState) {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemUncheckMe"),
    });
  } else {
    browser.menus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemCheckMe"),
    });
  }
}


/*Button Clicked - when we click the button we send a message
from this background script to the content script to open 
*/

// browser.browserAction.onClicked.addListener(buttonClicked)

// function buttonClicked(tabs) {
//   browser.tabs.sendMessage(tabs[0].id, {
//     replacement: "Message from the extension!"
//   });
// }


/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "remove-me":
      var removing = browser.menus.remove(info.menuItemId);
      removing.then(onRemoved, onError);
      break;
    case "check-uncheck":
      updateCheckUncheck();
      break;
    case "open-sidebar":
      console.log("Opening my sidebar");
      break;
    case "tools-menu":
      console.log("Clicked the tools menu item");
      break;
  }
});
