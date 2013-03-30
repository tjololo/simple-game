define(["keyboard"], function(KeyboardJS) {
    var connection = new WebSocket('ws://127.0.0.1:3000');
    function movePlayer(direction) {
	var movedist = 1;
	if(direction==="right") {
	    $("#player1").stop().animate({left:"+=" + movedist},0.5,moveRight);
	} else if(direction==="left"){
	    $("#player1").stop().animate({left:"-=" + movedist},0.5, moveLeft);
	} else if(direction==="down"){
	    $("#player1").stop().animate({top:"+=" + movedist},0.5, moveDown);
	} else if(direction==="up"){
	    $("#player1").stop().animate({top:"-=" + movedist},0.5, moveUp);
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
	console.log("BOMBS AWAY!");
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

    function registerKeys() {
	disableDefaults();
	console.log("Registering keys");
	KeyboardJS.on('left', moveLeft, stopMove);
	KeyboardJS.on('right', moveRight, stopMove);
	KeyboardJS.on('down', moveDown, stopMove);
	KeyboardJS.on('up', moveUp, stopMove);
	KeyboardJS.on('space', dropBomb);
	console.log("Keys registered");
    }

    return {
	registerKeys: registerKeys
    }
});
