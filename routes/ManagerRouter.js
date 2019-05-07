var express = require('express');
var router = express.Router();
var managerService = require('../service/ManagerService');

var Shutter = require('../dao/Shutter');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list', (req, res) => {
    managerService.listOrders((orders) => {
        res.status(200).send(orders);
    });
});

router.get('/viewCustomer', (req, res) => {
    managerService.viewCustomer(req.body['customer'], (orders) => {
        res.status(200).send(orders);
    })
});

router.get('/createInvoice', (req, res) => {
    managerService.createInvoice(req.body['customer'], (orders) => {
        res.status(200).send(orders);
    })
});

router.get('/checkPayment', (req, res) => {
    managerService.checkPayment(req.body['_id'], (paymentStatus) => {
        res.status(200).send(paymentStatus);
    })
});

router.post('/organizeInstallation', (req, res) => {
    if (typeof req.body['_id'] == 'undefined')
    {
        res.status(415).send('ID is required.');
    } else {
        if (req.body['_id'].length == 24) {
            Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
                if (err) {
                    console.log(err);
                }

                if (typeof shutters != 'undefined') {
                    if (typeof shutters[0] != 'undefined') {
                        if (shutters[0].isPaid && shutters[0].isAssembled) {
                            shutters[0].isInstalled = true;
                            shutters[0].save();
                            res.status(200).send('Order with the following ID: ' + req.body['_id'] + ' has been marked for installation.');
                        } else {
                            res.status(415).send('Order with the following ID: ' + req.body['_id'] + ' can\'t be marked for installation, because it hasn\'t been paid or assembled yet.');
                        }
                    } else {
                        res.status(415).send('No order in the database with the following ID: ' + req.body['_id']);
                    }
                } else {
                    res.status(415).send('No order in the database with the following ID: ' + req.body['_id']);
                }
            });
        }
    }
});

router.get('/remove', (req, res) => {
    managerService.deleteOrder(req.body['_id'],(order) => {
        res.status(200).send(order);
    });
});

module.exports = router;