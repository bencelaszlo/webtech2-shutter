var express = require('express');
var bodyParser = require('body-parser');

var shutterQueryEndPoint = require('./routes/ShutterQueryEndPoint');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', shutterQueryEndPoint);

app.listen(8080, function() {
	console.log("Server is listening on the port 8080.")
});