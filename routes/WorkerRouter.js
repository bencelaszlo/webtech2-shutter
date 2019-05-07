var express = require('express');
var router = express.Router();

var Shutter = require('./Shutter');

var mongoose = require('mongoose');

router.post('/assemble', function(req, res) {
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
                            shutters[0].isAssembled = true;
                            shutters[0].save();
                            res.status(200).send(shutters);
                        } else {
                            res.status(415).send('Order with the following ID: ' + req.body['_id'] + ' can\'t be marked for assembly, because it is waiting for the payment.');
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

router.get('/listParts', function(req, res) {
    if (typeof req.body['_id'] == 'undefined') {
        res.status(415).send('ID is required.');
    } else {
        Shutter.find({'_id': req.body['_id']}).exec(function (err, shutters) {
            res.status(200).send(shutters[0].parts);
        });
        return;
    }
});

module.exports = router;