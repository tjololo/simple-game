define(["board-renderer","movement", "dummyServer"], function(B, Movement, Server) {
    return {
	//Starts "game" when page hase loaded
	start: function() {
	    var gameBoard = B.renderBoard(Server.getGameBoard(10,10));
	    $(window).bind('load', function() {
		$("#game").html(gameBoard);
		Movement.registerKeys();
	    });
	}
    }
});
