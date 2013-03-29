var Board = this.Board || {};



(function(B){
    function createElement(className) {
	var el = document.createElement("div");
	el.className = className;
	return el;
    }

    B.renderBoard= function(gameBoard) {
	var board =  createElement("board");
	gameBoard.forEach(function(gameRow) {
	    var row = createElement("row");
	    gameRow.forEach(function(gameBlock) {
		var block = createElement("block");
		row.appendChild(block);
	    });
	    board.appendChild(row);
	});
	return board;
    }
}(Board));
