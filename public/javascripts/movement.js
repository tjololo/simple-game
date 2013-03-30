define(["keyboard"], function(KeyboardJS) {
    var move = false;
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
	if(move) {
	    movePlayer("left");
	}
    }
    
    function startMoveLeft() {
	move = true;
	moveLeft();
    }

    function moveRight() {
	if(move) {
	    movePlayer("right");
	}
    }

    function startMoveRight() {
	move = true;
	moveRight();
    }
    
    function moveDown() {
	if(move) {
	    movePlayer("down");
	}
    }
    
    function startMoveDown() {
	move = true;
	moveDown();
    }

    function moveUp() {
	if(move) {
	    movePlayer("up");
	}
    }

    function startMoveUp() {
	move = true;
	moveUp();
    }
    
    function stopMove() {
	console.log("Stop");
	move = false;
    }

    function disableDefaults() {
	var ar = new Array(37, 38, 39, 40);
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
	KeyboardJS.on('left', startMoveLeft, stopMove);
	KeyboardJS.on('right', startMoveRight, stopMove);
	KeyboardJS.on('down', startMoveDown, stopMove);
	KeyboardJS.on('up', startMoveUp, stopMove);
	console.log("Keys registered");
    }

    return {
	registerKeys: registerKeys
    }
});
