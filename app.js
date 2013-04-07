var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , io = require('socket.io')
  , path = require('path');

var app = express()
var port = process.env.PORT || 5000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }


// io.configure(function () {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });




app.get('/', routes.index);
app.get('/remote', routes.remote);
app.get('/world', routes.world);


var http_server = http.createServer(app)
var io_server = io.listen(http_server);


http_server.listen(port, function() {
  console.log("Listening on port " + port);
});

io_server.sockets.on('connection', function (socket) {
  console.log('socket io running')
  socket.on('on hammer', function (data) {
    console.log('recieved hammer');
    socket.broadcast.emit('hammer data', data);
  });
});
