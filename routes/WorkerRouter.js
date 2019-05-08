var express = require('express');
var router = express.Router();
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

router.post('/assemble',(req, res) => {
    workerService.assembleShutter(req.body['_id'],(orders) => {
        res.status(200).send(orders);
    });
});

router.get('/listParts', (req, res) => {
    workerService.listPartsByOrder(req.body['_id'],(parts) => {
        res.status(200).send(parts);
    });
});

module.exports = router;