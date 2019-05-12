// External dependencies
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Routers
var indexRouter = require('./routes/IndexRouter');
var customerRouter = require('./routes/CustomerRouter');
var workerRouter = require('./routes/WorkerRouter');
var managerRouter = require('./routes/ManagerRouter');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/customer', customerRouter);
app.use('/worker', workerRouter);
app.use('/manager', managerRouter);

module.exports = app;
