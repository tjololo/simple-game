requirejs.config({
    baseUrl: 'javascripts/'
});
require(["jquery", "play"], function($, Game) {
    Game.start();
});
