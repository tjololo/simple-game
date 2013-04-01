var WebSocketServer = require('websocket').server;
var MessageHandler = require('./message-handler');
(function(){
    var clients = [];
    function sendMessage(msg) {
	clients.forEach(function(client) {
	    client.sendUTF(msg);
	});
    }
    
    module.exports = {
	createAndStart: function(httpServer, callback) {
	    console.log("about to start: ");
	    var wsServer = new WebSocketServer({httpServer: httpServer});
	    
	    wsServer.on('request', function(req) {
		var connection = req.accept(null, req.origin);
		var index = clients.push(connection);
		
		connection.on('close', function() {
		    clients.splice(index-1, 1);
		});

		connection.sendUTF(JSON.stringify({type:"playernbr", number:clients.length}));
		
		connection.on('message', function(msg) {
		    MessageHandler.onMessage(msg, sendMessage);
		});
		
		
	    });
	    
	    callback();
	}
    }
}());
