define([], function() {

    function isBlockRemoveable(bomb, direction) {
	var row = bomb.row;
	var col = bomb.col;
	if(direction==="left"){
	    col = col-1;
	} else if(direction==="right") {
	    col = col+1;
	} else if(direction==="up") {
	    row = row-1;
	} else if(direction==="down") {
	    row = row+1;
	}
	var elRow = $(".board").children()[row];
        var block = $($(elRow).children()[col]);
	if(block.hasClass("blocked")) {
	    return {row:row, col:col, type:"blocked"};
	} else if(block.hasClass("permanent")) {
	    return {row:row, col:col, type:"permanent"};
	} else if(block.hasClass("block")) {
	    return {row:row, col:col, type:"open", direction:direction};
	}
	return false;
    }
    
    function animateRemove(tile, nr) {
	var callNr = nr || 1;
	if(callNr<=7) {
	    tile.addClass("remove"+callNr);
	    setTimeout(function() {
		animateRemove(tile,++callNr);
	    },50);
	} else {
	    tile.removeClass("blocked remove1 remove2 remove3 remove4 remove5 remove6 remove7");
	}
    }

    function animateExplosion(tile, direction, nr) {
	var callNr = nr || 1;
	direction = direction || "";
	if(callNr<=4) {
	    tile.addClass("exend"+direction+callNr);
	    setTimeout(function() {
		animateExplosion(tile,direction,++callNr);
	    },70);
	} else {
	    tile.removeClass("exend"+direction+"1 exend"+direction+"2 exend"+direction+"3 exend"+direction+"4");
	}
    }

    function animateExplosions(tiles) {
	tiles.forEach(function(tile) {
	    var el = $($(".board").children()[tile.row]).children()[tile.col];
	    animateExplosion($(el),tile.direction);
	});
    }

    function removeExplodedWalls(tiles) {
	tiles.forEach(function(tile) {
	    var el = $($(".board").children()[tile.row]).children()[tile.col];
	    animateRemove($(el));
	});
    }

    function getAffectedTiles(bomb) {
	var tilesOpen = [];
	var tilesBlocked = [];
	tilesOpen.push({row:bomb.row,col:bomb.col});
	var tile = isBlockRemoveable(bomb,"left");
	if(tile && tile.type==="blocked") {
	    tilesBlocked.push(tile);
	} else if(tile && tile.type==="open") {
	    tilesOpen.push(tile);
	}
	tile = isBlockRemoveable(bomb,"right");
	if(tile && tile.type==="blocked") {
	    tilesBlocked.push(tile);
	} else if(tile && tile.type==="open"){
	    tilesOpen.push(tile);
	}
	tile = isBlockRemoveable(bomb,"up");
	if(tile && tile.type==="blocked") {
	    tilesBlocked.push(tile);
	} else if(tile && tile.type==="open") {
	    tilesOpen.push(tile);
	}
	tile = isBlockRemoveable(bomb,"down");
	if(tile && tile.type==="blocked") {
	    tilesBlocked.push(tile);
	} else if(tile && tile.type==="open") {
	    tilesOpen.push(tile);
	}
	console.log("affectedsays: " +tilesOpen.length);
	return {blocked:tilesBlocked,open:tilesOpen};
    }

    function animateBomb(tile, bomb) {
	setTimeout(
	    function() {
		$(tile).addClass("bomb2");
		setTimeout(function() {
		    $(tile).addClass("bomb3");
		    setTimeout(function() {
			$(tile).removeClass("bomb3").removeClass("bomb2").removeClass("bomb");
			bomb.callback(getAffectedTiles(bomb));
		    },100);
		}, 100);
	    }, 4800);
    }

    
    function placeBomb(bomb) {
	var tile = $($(".board").children()[bomb.row]).children()[bomb.col];
	$(tile).addClass("bomb");
	animateBomb(tile, bomb);
    }
	
    function triggerBomb(tilesAffected) {
	removeExplodedWalls(tilesAffected.blocked);
	animateExplosions(tilesAffected.open);
    }
    return {
	placeBomb: placeBomb,
	triggerBomb: triggerBomb
    }
});
