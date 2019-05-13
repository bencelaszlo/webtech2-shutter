// Schema
var Shutter = require('./Shutter');
// External dependencies
var mongoose = require('mongoose');

class DAO {

    readOrders(callback) {
        Shutter.find({}).exec(function(err, doc) {
            callback(doc);
        });
    }

    readOrdersByCustomerName(customerName, callback)  {
        Shutter.find({'customer': customerName}).exec(function(err, orders) {
            callback(orders);
        });
    }

    readPaymentStatusById(orderId, callback) {
        Shutter.findOne({'_id': orderId}).exec(function(err, order) {
            if (order !== null && order !== undefined) {
                callback(order.isPaid);
            } else {
                console.log(err);
                return({});
            }
        });
    }

    readPartsByOrder(orderId, callback) {
        Shutter.findOne({'_id': orderId}).exec(function(err, order) {
            if (order !== null && order !== undefined) {
                callback(order.parts);
            } else {
                console.log(err);
                return({});
            }
        });
    }

    readNextInstallationTime(orderId, callback) {
        var lastDate = {
            "year": 0,
            "month": 0,
            "day": 0,
            "hours": 0
        };

        Shutter.find({}).then(function (orders) {
            orders.forEach(function(order) {
                if (order.installationDate.year >= lastDate.year) {
                    if (order.installationDate.month >= lastDate.month) {
                        if (order.installationDate.day >= lastDate.day) {
                            if (order.installationDate.hours > lastDate.hours) {
                                lastDate = {
                                    "year": order.installationDate.year,
                                    "month": order.installationDate.month,
                                    "day": order.installationDate.day,
                                    "hours": order.installationDate.hours
                                };
                            }
                        }
                    }
                }
            });
            var timeForInstallation = {
                "year": lastDate.year,
                "month": lastDate.month,
                "day": lastDate.day,
                "hours": lastDate.hours + 1
            };

            Shutter.findOne({'_id': orderId}).exec(function(err, order) {
                if (order !== null) {
                    order.installationDate = timeForInstallation;
                    order.save();
                } else {
                    console.log(err);
                }
            });

            callback(timeForInstallation);
        });
    }

    updateOrderPay(orderId, callback) {
            Shutter.findOne({'_id': orderId}).exec(function(err, order) {
                if (order !== null) {
                    order.isPaid = true;
                    order.save();
                    callback(order);
                } else {
                    console.log(err);
                    callback('{}');
                }
        });
    }

    updateOrderAssemble(orderId, callback) {
        Shutter.findOne({'_id': orderId}).exec(function(err, order) {
            if (order !== null) {
                order.isAssembled = true;
                order.save();
                callback(order);
            } else {
                console.log(err);
                callback('{}');
            }
        });
    }

    writeOrder(order, callback) {
        Shutter.create({
            _id: new mongoose.Types.ObjectId(),
            parts: {
                tiltBar: order.body['tiltBar'],
                hinges: order.body['hinges'],
                louvers: order.body['louvers'],
                louverPins: order.body['louverPins'],
                glue: order.body['glue']
            },
            price: order.body['price'],
            isPaid: false,
            isAssembled: false,
            isInvoiced: false,
            installationDate: "",
            customer: order.body['customer']
        }, (err, result) => {
            callback({"orderId": result._id, "error": err});
        });
    }

}

module.exports = new DAO();