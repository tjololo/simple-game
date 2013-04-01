
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, websocket = require('./server/server');


//Website(Frontend)
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
//    app.use(express.favicon());
    app.use(express.favicon(__dirname + '/public/images/favicon.ico')); 
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

//Routes
app.get('/', routes.index);

//Start server
var httpServer = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


//Websocket backend
websocket.createAndStart(httpServer, function() {
    console.log("BomberJS websocket server listening on port " + app.get('port'));
});
