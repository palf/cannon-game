var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , io = require('socket.io')
  , path = require('path');

var app = express()
var port = process.env.PORT || 5000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/remote', routes.remote);
app.get('/world', routes.world);


var http_server = http.createServer(app)

http_server.listen(port, function() {
  console.log("Listening on port " + port);
});


var io_server = io.listen(http_server);

io_server.configure(function () {
  io_server.set("transports", ["xhr-polling"]);
  io_server.set("polling duration", 10);
});

io_server.sockets.on('connection', function (socket) {
  socket.on('on gesture', function (data) {
    socket.broadcast.emit('gesture data', data);
  });
});
