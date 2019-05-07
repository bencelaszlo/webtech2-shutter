var express = require('express');
var router = express.Router();

var Shutter = require('./Shutter');

var mongoose = require('mongoose');

router.get('/', (req, res) => {
    req.url = '/list';
    router.handle(req, res);
});

router.get('/list', (req, res) => {
    if (typeof req.query['_id'] != 'undefined') {
        Shutter.find({'_id': req.query['_id']}).exec(function(err, doc) {
            if (doc.length > 0) {
                var result = "<div>";
                for (var i = 0; i < doc.length; i++) {
                    result += "<div>";
                    result += "<b>ID: " + doc[i].id + "</b><br/>";
                    result += "<b>Customer: " + doc[i].customer + "</b><br/>";
                    result += "<b>Price: " + doc[i].price + "</b><br/>";
                    if (doc[i].isPaid) {
                        if (doc[i].isAssembled) {
                            if (doc[i].isInstalled) {
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
                res.status(200).send("<h1>" + result + "</h1>"
                );
            } else {
                res.status(200).send("<h1>Not found order with this ID: " + req.query['_id'] + "</h1>");
            }
        });
        return;
    }
    Shutter.find({}).exec(function(err, doc) {
        var result = "<div>";
        for (var i = 0; i < doc.length; i++) {
            result += "<div>";
            result += "<b>ID: " + doc[i].id + "</b><br/>";
            result += "<b>Customer: " + doc[i].customer + "</b></br>";
            result += "<b>Price: " + doc[i].price + "</b></br>";
            if (doc[i].isPaid) {
                if (doc[i].isAssembled) {
                    if (doc[i].isInstalled) {
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
        res.status(200).send("<h1>" + result + "</h1>");
    });
});

router.post('/sendOrder', (req, res) => {
    Shutter.create({
        _id: new mongoose.Types.ObjectId(),
        parts: {
            tiltBar: req.body['tiltBar'],
            tiltBarConnector: req.body['tiltBarConnector'],
            catches: req.body['catches'],
            louvers: req.body['louvers'],
            louverPins: req.body['louverPins'],
            glue: req.body['glue']
        },
        price: req.body['price'],
        isPaid: false,
        isAssembled: false,
        isInstalled: false,
        customer: req.body['customer']
    }, function (err, doc) {
        if (err) {
            return console.log(err);
            console.log(err);
            console.log(doc);
            res.status(415).send(err + ' ' + doc);
        }
        res.status(200).send("Order has been saved.");
    });
});

router.post('/pay', (req, res) => {
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
                        shutters[0].isPaid = true;
                        shutters[0].save();
                        res.status(200).send(shutters);
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

module.exports = router;