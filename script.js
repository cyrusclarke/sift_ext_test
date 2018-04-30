/*testing out sending a message from a content script to background script
in this content script we send a message using sendMessage	
*/

document.getElementById('notifyMe').addEventListener('click', function(){
	browser.runtime.sendMessage({
		action:'notify'
	})
})


function handleResponse(message) {
  console.log('Message from the background script:  ${message.response}');
}

function notifyBackgroundPage(e) {
	var sending = browser.runtime.sendMessage({
		greeting: "Hello from the content script"
	});

	sending.then(handleResponse);
	  
}

window.addEventListener("click", notifyBackgroundPage);