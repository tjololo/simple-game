define(["board-renderer","movement", "server"], function(B, Movement, Server) {
    function messageListener(msg) {
	try {
	    var json = JSON.parse(msg.data);
	} catch (e) {
	    console.log("error parsing json");
	}
	if(json.type==="map") {
	    $("#game").html(B.renderBoard(json.map));
	    var game = $(".board");
	    var position = game.position();
	    var width = game.width()-$("#player1").width();
	    var height = game.height()-$("#player1").height();
	    $("#player1").css({left:position.left,top:position.top});
	    $("#player2").css({left:position.left+width,top:position.top});
	    $("#player3").css({left:position.left,top:position.top+height});
	    $("#player4").css({left:position.left+width,top:position.top+height});
	}
    }
    return {
	//Starts "game" when page hase loaded
	start: function() {
	    var connection = new WebSocket("ws://" + document.domain + ":3000");
	    var server = new Server(connection);
	    server.registerMessageListener(messageListener);
	    //var gameBoard = B.renderBoard(server.getGameBoard(19,19));
	    //$("#game").html(gameBoard);	    
	    var m = new Movement(server);
	    connection.onopen = function() {
		server.getMap();
		m.registerKeys();
	    };
	}
    }
});
       
