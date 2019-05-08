var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var indexRouter = require('./routes/IndexRouter');
var customerRouter = require('./routes/CustomerRouter.js');
var workerRouter = require('./routes/WorkerRouter.js');
var managerRouter = require('./routes/ManagerRouter');

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/worker', workerRouter);
app.use('/manager', managerRouter);

module.exports = app;