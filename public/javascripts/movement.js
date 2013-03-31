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

    function canMove(direction) {
	var board = $(".board");
        var player = $("#player"+playernbr);
	if(direction === "right") {
	    return (board.position().left+board.width()) > (player.position().left + player.width());
	}
	if(direction === "left") {
	    return board.position().left < player.position().left;
	}
	if(direction === "down") {
	    return (board.position().top + board.height()) > (player.position().top + player.height());
	}
	if(direction === "up") {
	    return board.position().top < player.position().top;
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
	connection.send(JSON.stringify({type: "drop", msg: "BOMBS AWAY"}));
	console.log((new Date())+"BOMBS AWAY!");
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
	console.log("Registering keys");
	KeyboardJS.on('left', moveLeft, stopMove);
	KeyboardJS.on('right', moveRight, stopMove);
	KeyboardJS.on('down', moveDown, stopMove);
	KeyboardJS.on('up', moveUp, stopMove);
	KeyboardJS.on('space', dropBomb);
	window.setInterval(updateServer, 50);
	console.log("Keys registered");
    }

    return {
	registerKeys: registerKeys
    }
});
