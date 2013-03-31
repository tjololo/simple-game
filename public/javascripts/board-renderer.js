define([], function() {
    function createElement(type,className) {
	var el = document.createElement(type);
	el.className = className;
	return el;
    }

    function render(gameBoard) {
	var board =  createElement("span","board");
	gameBoard.forEach(function(gameRow) {
	    var row = createElement("div","row");
	    gameRow.forEach(function(gameBlock) {
		var style = "block";
		if(gameBlock.type==="permanent") {
		    style += " permanent";
		    console.log("style: " + style);
		}
		var block = createElement("div",style);
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
