(function(){
    "use strict";
    function movePlayer(direction) {
	var movedist = 3;
	if(direction==="right") {
	    $("#player1").animate({left:"+=" + movedist},0);
	} else if(direction==="left"){
	    $("#player1").animate({left:"-=" + movedist},0);
	} else if(direction==="down"){
	    $("#player1").animate({top:"+=" + movedist},0);
	} else if(direction==="up"){
	    $("#player1").animate({top:"-=" + movedist},0);
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
	console.log("Stop");
    }

    $(window).bind('load', function() {
	console.log("Registering keys");
	KeyboardJS.on('left', moveLeft, stopMove);
	KeyboardJS.on('right', moveRight, stopMove);
	KeyboardJS.on('down', moveDown, stopMove);
	KeyboardJS.on('up', moveUp, stopMove);
	console.log("Keys registered");
    });
}());
