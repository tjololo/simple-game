(function() {
    function onMessage(msg, sendMessage) {
	try {
	    var json = JSON.parse(msg.utf8Data);
	} catch (e) {
	    console.log("Received a non json msg");
	    return;
	}
	if(json.type==="move") {
	    sendMessage(msg.utf8Data);
	} if(json.type=="drop") {
	    sendMessage(msg.utf8Data);
	}else {
	    sendMessage(JSON.stringify({msg:"test response"}));
	}
    }

    module.exports = {
	onMessage: onMessage
    }
}());
