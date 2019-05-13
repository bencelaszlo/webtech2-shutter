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
        var lastOrderId = Shutter.findOne({}).sort({date: -1}).exec(function(err, lastItem) {
            if (lastItem !== null && lastItem._id !== undefined) {
                //lastOrderId = lastItem._id;
            } else {
                console.log(err);
            }
            return(lastOrderId);
        });

        var installationTime = Shutter.findOne({'_id': lastOrderId}).exec(function(err, lastTime) {
            var now = new Date();
            var timeForInstallation = {
                "year": lastTime.getFullYear(),
                "month": lastTime.getMonth() + 1,
                "date": lastTime.getDate(),
                "hours": lastTime.getHours(),
            };

            if ( (lastTime.installationDate.getTime() - now.getTime() ) > 0) {
                if (lastTime.installationDate.hours === 16) {
                    if (lastTime.getMonth() === 1) {
                        if (lastTime.getDate() === 28) {
                            timeForInstallation.date = 1;
                            timeForInstallation.month++;
                        } else {
                            timeForInstallation.date++;
                        }
                    } else if ([0, 2, 4, 6, 7, 9, 11].includes(lastTime.getDate)) {
                        if (lastTime.getDate === 31) {
                            timeForInstallation.date = 1;
                            timeForInstallation.month++;
                        } else {
                            timeForInstallation.date++;
                        }
                    } else {
                        if (lastTime.getDate === 30) {
                            timeForInstallation.date = 1;
                            timeForInstallation.month++;
                        } else {
                            timeForInstallation.date++;
                        }
                    }
                    timeForInstallation.hours = 8;
                    timeForInstallation.minutes = 0;
                }
            }
            return timeForInstallation;
        });

        Shutter.findOne({'_id': orderId}).exec(function(err, order) {
            if (order !== null) {
                order.installationDate = installationTime;
                order.save();
                callback(order);
            } else {
                console.log(err);
                callback('{}');
            }
        });

        callback(installationTime);
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

}

module.exports = new DAO();