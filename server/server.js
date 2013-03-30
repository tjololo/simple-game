var WebSocketServer = require('websocket').server;
var MessageHandler = require('./message-handler');
(function(){
    module.exports = {
	createAndStart: function(httpServer, callback) {
	    console.log("about to start: ");
	    var wsServer = new WebSocketServer({httpServer: httpServer});
	    
	    wsServer.on('request', function(req) {
		var connection = req.accept(null, req.origin);
		connection.on('message', MessageHandler.onMessage);
	    });
	    
	    callback();
	}
    }
}());
