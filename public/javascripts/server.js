define([],function() {
    var connection = null;
    var consumers = [];
    function generateDummyBoard(rows,colums) {
	var board =[];
	for(var i = 1; i <= rows; ++i) {
	    var row = [];
	    for(var j = 1; j <= colums; ++j) {
		if(i%2===0 && j%2===0) {
		    row.push({type:"permanent"});
		} else if(i===3 && (j===3||j===4)) {
		    row.push({type:"blocked"});
		}else {
		    row.push({});
		}
	    }
	    board.push(row);
	}
	return board;
    }

    function getMap() {
	console.log("sending request for map");
	connection.send(JSON.stringify({type:"genmap"}));
    }

    function registerMessageListener(listener) {
	consumers.push(listener);
    }

    function send(msg) {
	connection.send(msg);
    }

    return function Server(conn){
	connection = conn;
	connection.onmessage = function(message) {
	    consumers.forEach(function(consumer) {
		consumer(message);
	    });
	}
	this.getMap = getMap;
	this.registerMessageListener = registerMessageListener;
	this.send = send;
    }
});
