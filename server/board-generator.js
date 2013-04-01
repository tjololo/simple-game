(function() {
    var o = {type:"open"};
    var b = {type:"blocked"};
    var p = {type:"permanent"};
    
    function generateBoard(rows, columns, blockerChance) {
	if(rows%2===0 || columns%2===0) {
	    throw "Must have odd number of columns and rows";
	}
	var board =[];
	for(var i = 1; i <= rows; ++i) {
	    var row = [];
	    for(var j = 1; j <= columns; ++j) {
		if(i%2===0 && j%2===0) {
		    row.push(p);
		} else if((i===1 && (j===1 || j===2 || j===columns-1 || j===columns)) || (i===2 && (j===1|| j===columns)) || (i===rows && (j===1 || j===2 || j===columns-1 || j===columns)) || (i===rows-1 && (j===1 || j===columns))) {
		    row.push(o);
		}else {
		    row.push(randomOpen(blockerChance));
		}
	    }
	    board.push(row);
	}
	return board;
    }

    function randomOpen(chanceForBlocked) {
	if(Math.floor(Math.random() * 100) + 1 > chanceForBlocked) {
	    return o;
	}
	return b;
    }

    module.exports = {
	genMap: generateBoard
    }
}());
