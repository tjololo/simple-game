define(["keyboard"], function(KeyboardJS) {
    var connection = new WebSocket('ws://192.168.3.117:3000');
    var playernbr = 0;
    connection.onmessage = function(message) {
	try {
	    var json = JSON.parse(message.data);
	} catch (e) {
	    console.log("Response not json");
	    return;
	}
	if(json.type==="move" && json.player !== playernbr) {
	    $("#player"+json.player).animate({left:json.left, top:json.top},0);
	} else if(json.type==="playernbr") {
	    playernbr = json.number;
	    console.log("This is player number: " + playernbr);
	}
    };

    function sendToServer(msg) {
	msg.player = playernbr;
	connection.send(JSON.stringify(msg));
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
	var tile = $($(".board").children()[getRow()]).children()[getColumn()];
	$(tile).addClass("bomb");
	setTimeout(
	    function() {
		$(tile).removeClass("bomb").addClass("bomb2");
		setTimeout(function() {
		    $(tile).removeClass("bomb2").addClass("bomb3");
		    setTimeout(function() {
			$(tile).removeClass("bomb3");
		    },100);
		}, 100);
	    }, 4000);
	connection.send(JSON.stringify({type: "drop", row: getRow(), col: getColumn()}));
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
	window.setInterval(updateServer, 50);
    }

    return {
	registerKeys: registerKeys
    }
});
