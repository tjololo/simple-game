define([],function() {
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

    return {
	getGameBoard: generateDummyBoard
    }
});
