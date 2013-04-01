define(["keyboard"], function(KeyboardJS) {
    var playernbr = 1;

    function onMessage(message) {
	try {
	    var json = JSON.parse(message.data);
	} catch (e) {
	    console.log("Response not json");
	    return;
	}
	if(json.type==="move" && json.player !== playernbr) {
	    $("#player"+json.player).animate({left:json.left, top:json.top},0);
	} else if(json.type==="drop") {
	    registerNewBomb(json.row,json.col);
	} else if(json.type==="remove") {
	    removeBlockers(json.tiles);
	} else if(json.type==="playernbr") {
	    playernbr = json.number;
	    console.log("This is player number: " + playernbr);
	} else if(json.type==="map") {
	    window.setInterval(updateServer, 50);
	}
    }

    function sendToServer(msg) {
	msg.player = playernbr;
	this.server.send(JSON.stringify(msg));
    }

    function getRow() {
	var player = $("#player"+playernbr);
	var position = player.position().top+(player.height()/2);
	return Math.floor((position-$(".board").position().top)/$(".block").height());
    }

    function getColumn() {
	var player = $("#player"+playernbr);
	var position = player.position().left+(player.width()/2);
	return Math.floor((position-$(".board").position().left)/$(".block").width());
    }
    

    function isBlocked(diffRow, diffColumn) {
	var row = $(".board").children()[getRow()+diffRow];
        var block = $($(row).children()[getColumn()+diffColumn]);
        if(block.hasClass("permanent") || block.hasClass("blocked") || block.hasClass("bomb")) {
            return {top: block.position().top,
		    bottom: block.position().top+block.height(),
		    left: block.position().left,
		    right: block.position().left+block.width()};
        }
    }

    function isBlockRemoveable(row,col) {
	var elRow = $(".board").children()[row];
        var block = $($(elRow).children()[col]);
	if(block.hasClass("blocked")) {
	    return {row:row, col:col};
	}
	return false;
    }

    function canMove(direction) {
	var board = $(".board");
        var player = $("#player"+playernbr);
	if(direction === "right") {
	    if ((board.position().left+board.width()) <= (player.position().left + player.width())) {
		return false;
	    } else {
		var block = isBlocked(0,1);
		return !(block && block.left <= (player.position().left+player.width()));
	    }
	}
	if(direction === "left") {
	    if (board.position().left >= player.position().left) {
		 return false;
            } else {
                var block = isBlocked(0,-1);
                return !(block && block.right >= player.position().left);
            }
	}
	if(direction === "down") {
	    if ((board.position().top + board.height()) <= (player.position().top + player.height())) {
		return false;
            } else {
                var block = isBlocked(1,0);
                return !(block && block.top <= (player.position().top+player.height()));
            }
	}
	if(direction === "up") {
	    if (board.position().top >= player.position().top) {
		return false;
            } else {
                var block = isBlocked(-1,0);
                return !(block && block.bottom >= player.position().top);
            }
	}
    }

    function movePlayer(direction) {
	if(canMove(direction)) {
	    var movedist = 1;
	    var player = $("#player"+playernbr);
	    if(direction==="right") {
		player.stop().animate({left:"+=" + movedist},1,moveRight);
	    } else if(direction==="left"){
		player.stop().animate({left:"-=" + movedist},1, moveLeft);
	    } else if(direction==="down"){
		player.stop().animate({top:"+=" + movedist},1, moveDown);
	    } else if(direction==="up"){
		player.stop().animate({top:"-=" + movedist},1, moveUp);
	    }
	}
    }

    function moveLeft(){
	movePlayer("left");
    }
    
    function moveRight() {
	movePlayer("right");
    }
    
    function moveDown() {
	movePlayer("down");
    }
    
    function moveUp() {
	movePlayer("up");
    }
    
    function stopMove() {
	$("#player"+playernbr).stop();
    }
 
    function dropBomb() {
	sendToServer({type: "drop", row: getRow(), col: getColumn()});
    }

    function removeExplodedBlocks(row, col) {
	var tilesBlocked = [];
	var tile = isBlockRemoveable(row-1,col);
	if(tile) {
	    tilesBlocked.push(tile);
	}
	tile = isBlockRemoveable(row+1,col)
	if(tile) {
	    tilesBlocked.push(tile);
	}
	tile = isBlockRemoveable(row,col-1)
	if(tile){
	    tilesBlocked.push(tile);
	}
	tile = isBlockRemoveable(row,col+1)
	if(tile) {
	    tilesBlocked.push(tile);
	}
	sendToServer({type:"remove", tiles:tilesBlocked});
    }

    function removeBlockers(tiles) {
	tiles.forEach(function(tile) {
	    var el = $($(".board").children()[tile.row]).children()[tile.col];
	    animateRemove($(el),1);
	});
    }

    function animateRemove(el, nr) {
	if(nr<=7) {
	    el.addClass("remove"+nr);
	    setTimeout(function() {
		animateRemove(el,++nr);
	    },50);
	} else {
	    el.removeClass("blocked remove1 remove2 remove3 remove4 remove5 remove6 remove7");
	}
    }

    function registerNewBomb(row, col, bomb) {
	var tile = $($(".board").children()[row]).children()[col];
	$(tile).addClass("bomb");
	setTimeout(
	    function() {
		$(tile).addClass("bomb2");
		setTimeout(function() {
		    $(tile).addClass("bomb3");
		    setTimeout(function() {
			$(tile).removeClass("bomb3").removeClass("bomb2").removeClass("bomb");
			removeExplodedBlocks(row,col);
		    },100);
		}, 100);
	    }, 4800);
    }

    function disableDefaults() {
	var ar = new Array(32, 37, 38, 39, 40);
	var disableArrowKeys = function(e) {
	    if ($.inArray(e.keyCode, ar)>=0) {
		e.preventDefault();
	    }
	}
	
	$(document).keydown(disableArrowKeys);
    }

    function updateServer() {
	var position = $("#player"+playernbr).position();
	if(position) {
	    sendToServer({type:"move",top:position.top, left:position.left});
	}
    }

    function registerKeys() {
	disableDefaults();
	KeyboardJS.on('left', moveLeft, stopMove);
	KeyboardJS.on('right', moveRight, stopMove);
	KeyboardJS.on('down', moveDown, stopMove);
	KeyboardJS.on('up', moveUp, stopMove);
	KeyboardJS.on('space', dropBomb);

    }

    return function Movement(s){
	server = s;
	server.registerMessageListener(onMessage);
	this.registerKeys = registerKeys;
    }
});
