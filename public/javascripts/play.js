define(["board-renderer","movement", "dummyServer"], function(B, Movement, Server) {
    return {
	//Starts "game" when page hase loaded
	start: function() {
	    var gameBoard = B.renderBoard(Server.getGameBoard(30,30));
	    $("#game").html(gameBoard);
	    var position = $("#game").position();
	    $("#player1").css({left:position.left,top:position.top});
	    Movement.registerKeys();
	}
    }
});
