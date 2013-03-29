define([],function() {
    function generateDummyBoard(rows,colums) {
	var board =[];
	for(var i = 0; i < rows; ++i) {
	    var row = [];
	    for(var j = 0; j < colums; ++j) {
		row.push({});
	    }
	    board.push(row);
	}
	return board;
    }

    return {
	getGameBoard: generateDummyBoard
    }
});
