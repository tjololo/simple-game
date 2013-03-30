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

    function movePlayer(direction) {
	var movedist = 5;
	if(direction==="right") {
	    $("#player"+playernbr).stop().animate({left:"+=" + movedist},60,moveRight);
	} else if(direction==="left"){
	    $("#player"+playernbr).stop().animate({left:"-=" + movedist},60, moveLeft);
	} else if(direction==="down"){
	    $("#player"+playernbr).stop().animate({top:"+=" + movedist},60, moveDown);
	} else if(direction==="up"){
	    $("#player"+playernbr).stop().animate({top:"-=" + movedist},60, moveUp);
	} else {
	    console.log("unknown direction");
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
	$("#player1").stop();
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
