var BoardGenerator = require('./board-generator');
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
	} else if(json.type==="drop") {
	    sendMessage(msg.utf8Data);
	} else if(json.type==="remove") {
	    sendMessage(msg.utf8Data);
	} else if(json.type==="genmap") {
	    console.log("generation map");
	    sendMessage(JSON.stringify({type:"map", map:BoardGenerator.genMap(19,19,80)}));
	} else {
	    sendMessage(JSON.stringify({msg:"test response"}));
	}
    }

    module.exports = {
	onMessage: onMessage
    }
}());
