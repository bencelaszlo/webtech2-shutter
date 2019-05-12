// External dependencies
var express = require('express');
var router = express.Router();
// Services
var workerService = require('../service/WorkerService');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list', (req, res) => {
    workerService.listOrders((orders) => {
       res.status(200).send(orders);
    })
});

router.get('/assemble/:orderId', (req, res) => {
    workerService.assembleShutter(req.params.orderId, (response) => {
        res.status(200).send(response);
    });
});

router.get('/listParts/:orderId', (req, res) => {
    workerService.listPartsByOrder(req.params.orderId,(parts) => {
        res.status(200).send(parts);
    });
});

module.exports = router;