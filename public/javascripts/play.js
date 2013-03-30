define(["board-renderer","movement", "dummyServer"], function(B, Movement, Server) {
    return {
	//Starts "game" when page hase loaded
	start: function() {
	    var gameBoard = B.renderBoard(Server.getGameBoard(30,30));
	    $("#game").html(gameBoard);
	    var game = $(".board");
	    var position = game.position();
	    var width = game.width()-20;
	    var height = game.height()-30;
	    $("#player1").css({left:position.left,top:position.top});
	    $("#player2").css({left:position.left+width,top:position.top});
	    $("#player3").css({left:position.left,top:position.top+height});
	    $("#player4").css({left:position.left+width,top:position.top+height});
	    Movement.registerKeys();
	}
    }
});
