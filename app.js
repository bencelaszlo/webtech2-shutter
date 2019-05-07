var express = require('express');
var bodyParser = require('body-parser');

var customerRouter = require('./routes/CustomerRouter.js');
var workerRouter = require('./routes/WorkerRouter.js');
var managerRouter = require('./routes/ManagerRouter');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/customer', customerRouter);
app.use('/worker', workerRouter);
app.use('/manager', managerRouter);

app.listen(8080, function() {
	console.log("Server is listening on the port 8080.")
});