'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
	http = require('http'),
	bodyParser = require('body-parser'),
	connect = require('connect'),
    path = require('path'),
    app = express();

// ====================== 
// ==== Mongo / Mongoose
// ====================== 
var mongoConnection = mongoose.createConnection('mongodb://localhost:27017');

// ====================== 
// ==== Express
// ====================== 
app.use(bodyParser.json());
app.set('view engine', 'ejs');
 // instruct express to server up static assets
app.use(express.static('public'));

// views as directory for all template files
app.set('views', path.join(__dirname, '/views'));


// Express Router
var httpRouter = express.Router();
app.use('*', httpRouter);
require('./routes')(app, mongoConnection);


// ====================== 
// ==== SERVER
// ====================== 
app.set('http_port', 3245);
var httpServer = http.createServer(app);

httpServer.listen(app.get('http_port'), function(){
  console.log('Express http server listening on port ' + httpServer.address().port);
});
