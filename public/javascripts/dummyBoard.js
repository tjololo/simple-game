(function(B){
    "use strict";
    var dummyBoard = [[{},{},{},{},{}],
		      [{},{},{},{},{}],
		      [{},{},{},{},{}],
		      [{},{},{},{},{}]];
    var el = B.renderBoard(dummyBoard);
    $(window).bind('load', function()
		   {
		       var game = $("#game");
		       game.html(el);
		   });
}(Board, jQuery));
