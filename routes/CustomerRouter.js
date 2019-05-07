var express = require('express');
var router = express.Router();
var customerService = require('../service/CustomerService');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list', (req, res) => {
    customerService.getOrdersByName(req.body['customer'], (orders) => {
        res.status(200).send(orders);
    })
});

router.post('/sendOrder', (req, res) => {
    customerService.sendOrder(req, (callback) => {
        res.status(200).send(callback);
    });
});

router.post('/pay', (req, res) => {
    customerService.payOrder(req.body['_id'], (callback) => {
       res.status(200).send(callback);
    });
});

module.exports = router;