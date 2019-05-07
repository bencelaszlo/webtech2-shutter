var express = require('express');
var router = express.Router();

var Shutter = require('./Shutter');

var mongoose = require('mongoose');

router.get('/viewCustomer', function(req, res) {
    if (typeof req.body['customer'] == 'undefined') {
        res.status(415).send('Customer is required.');
    } else {
        Shutter.find({'customer': req.body['customer']}).exec(function(err, shutters) {
            if (err) {
                console.log(err);
            }

            if (shutters.length != 0) {
                var result = '<h2>Orders from ' + req.body['customer'] + '</h2><br/>';
                result += '<div><h3>Orders</h3>';
                for (var i = 0; i < shutters.length; i++) {
                    result += "<div>";
                    result += "<b>ID: " + shutters[i].id + "</b><br/>";
                    result += "<b>Price: " + shutters[i].price + "</b><br/>";
                    if (shutters[i].isPaid) {
                        if (shutters[i].isAssembled) {
                            if (shutters[i].isInstalled) {
                                result += "Installed.<br/>";
                            } else {
                                result += "Waiting for installation.<br/>";
                            }
                        } else {
                            result += "Waiting for manufacturing.<br/>"
                        }
                    } else {
                        result += "Waiting for payment.<br/>";
                    }
                    result += "</div>";
                }
                result += "</div>";
                res.status(200).send(result);
            } else {
                res.status(415).send('Customer doesn\'t exist in the database with the following name: ' + req.body['customer']);
            }
        });
    }
});

router.get('/createInvoice', function(req, res) {
    if (typeof req.body['_id'] == 'undefined') {
        res.status(415).send('ID is required.');
    } else {
        Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
            if (err) {
                console.log(err);
            }

            if (typeof shutters != 'undefined') {
                if (typeof shutters[0] != 'undefined') {
                    res.status(200).send("Name: " + shutters[0].customer + " <br/>Price: " + shutters[0].price); //TO PDF?
                } else {
                    res.status(415).send('No order in the database with the following ID: ' + req.body['_id']);
                }
            } else {
                res.status(415).send('No order in the database with the following ID: ' + req.body['_id']);
            }
        });
    }
});

router.get('/checkPayment', function(req, res) {
    if (typeof req.body['_id'] == 'undefined') {
        res.status(415).send('ID is required.');
    } else {
        if (req.body['_id'].length == 24) {
            Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
                if (err) {
                    console.log(err);
                }

                if (typeof shutters != 'undefined') {
                    if (typeof shutters[0] != 'undefined') {
                        if (shutters[0].isPaid) {
                            res.status(200).send('Order with the following ID: ' + req.body['_id'] + ' has been paid successfully.');
                        } else {
                            res.status(200).send('Order with the following ID: ' + req.body['_id'] + ' hasn\'t been paid yet.');
                        }
                    } else {
                        res.status(200).send('No order in the database with the following ID: ' + req.body['_id']);
                    }
                }
            });
        }
    }
});

router.post('/organizeInstallation', function(req, res) {
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

router.get('/remove', function(req, res) {
    if (typeof req.body['_id'] == 'undefined') {
        res.status(415).send('ID is required!');
    } else {
        Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
            if (err) {
                console.log(err);
            }

            if (typeof shutters != 'undefined') {
                if (typeof shutters[0] != 'undefined') {
                    shutters[0].deleteOne();
                    res.status(200).send(req.body['_id'] + ' has been removed from the database.');
                } else {
                    res.status(415).send('No order in the database with the following ID: ' + req.body['_id']);
                }
            } else {
                res.status(415).send('No order in the database with the following ID: ' + req.body['_id']);
            }
        });
    }
});

module.exports = router;