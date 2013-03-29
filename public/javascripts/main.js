requirejs.config({
    baseUrl: 'javascripts/'
});
require(["jquery", "play"], function($, Game) {
    console.log("about to start game");
    Game.start();
});
