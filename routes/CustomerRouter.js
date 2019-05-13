var express = require('express');
var router = express.Router();
var customerService = require('../service/CustomerService');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list/:customer', (req, res) => {
    customerService.getOrdersByName(req.params.customer, (orders) => {
        res.status(200).send(orders);
    })
});

router.post('/sendOrder', (req, res) => {
    customerService.sendOrder(req.body, (callback) => {
        res.status(200).send(callback);
    });
});

router.post('/pay/:orderId', (req, res) => {
    customerService.payOrder(req.params.orderId, (callback) => {
       res.status(200).send(callback);
    });
});

module.exports = router;