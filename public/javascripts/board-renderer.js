define([], function() {
    function createElement(className) {
	var el = document.createElement("div");
	el.className = className;
	return el;
    }

    function render(gameBoard) {
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

    return {
	renderBoard: render
    }
});
