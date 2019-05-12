// External dependencies
var express = require('express');
var router = express.Router();
// Services
var managerService = require('../service/ManagerService');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list', (req, res) => {
    managerService.listOrders((orders) => {
        res.status(200).send(orders);
    });
});

router.get('/viewCustomer/:customer', (req, res) => {
    managerService.viewCustomer(req.params.customer, (orders) => {
        res.status(200).send(orders);
    })
});

router.get('/createInvoice/:customer', (req, res) => {
    managerService.createInvoice(req.params.customer, (response) => {
        res.status(200).send(response);
    })
});

router.get('/checkPayment/:orderId', (req, res) => {
    managerService.checkPayment(req.params.orderId, (paymentStatus) => {
        res.status(200).send(paymentStatus);
    })
});

router.get('/organizeInstallation/:orderId', (req, res) => {
    managerService.organizeInstallation(req.params.orderId, (installationTime) => {
        res.status(200).send(installationTime);
    })
});

module.exports = router;