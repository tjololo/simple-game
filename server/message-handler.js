(function() {
    function onMessage(msg) {
	console.log(msg);
	try {
	    var json = JSON.parse(msg.utf8Data);
	} catch (e) {
	    console.log("Received a non json msg");
	    return;
	}
	console.log("received a message" + json.msg);
    }

    module.exports = {
	onMessage: onMessage
    }
}());
