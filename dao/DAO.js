var Shutter = require('./Shutter');
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
            callback(order.isPaid);
        });
    }

    readPartsByOrder(orderId, callback) {
        Shutter.findOne({'_id': orderId}).exec(function(err, order) {
           callback(order.parts);
        });
    }

    readNextInstallationTime(orderId, callback) {
        var lastOrderId = Shutter.findOne({}).sort({date: -1}).exec(function(err, lastItem) {
            if (lastItem !== null && lastItem.orderId !== undefined) {
                lastOrderId = lastItem.orderId + 1;
            } else {
                lastOrderId = 0;
            }
            console.log(lastOrderId);
            return(lastOrderId);
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
                tiltBarConnector: order.body['tiltBarConnector'],
                catches: order.body['catches'],
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
        }, (err, doc) => {
            callback(doc);
        });
    }

    removeOrder(orderId, callback) {
        Shutter.findOne({'_id': orderId}).exec(function (err, order) {
            if (order !== null) {
                order.deleteOne();
                callback(orderId);
            } else {
                console.log(err);
                callback('{}');
            }
        });
    }
}

module.exports = new DAO();