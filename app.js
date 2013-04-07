var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

// io.configure(function () {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

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

app.get('/', routes.index);
app.get('/remote', routes.remote);
app.get('/world', routes.world);

http.createServer(app).listen(port, function() {
  console.log("Listening on " + port);
});

