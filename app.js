var express = require('express');
var http = require('http')


var app = express()
var port = process.env.PORT || 5000;

app.get('/', function(request, response) {
  response.send('Hello World!');
});

http.createServer(app).listen(port, function() {
  console.log("Listening on " + port);
});



// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// app.get('/', routes.index);
// app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
