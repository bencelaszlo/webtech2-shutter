var DAO = require('../dao/DAO.js');

class CustomerService {
    getOrdersByName(customerName, callback) {
        DAO.readOrdersByCustomerName(customerName, callback);
    }

    sendOrder(order, callback) {
        DAO.writeOrder(order, callback);
    }

    payOrder(orderId, callback) {
        DAO.updateOrderPay(orderId, callback);
    }
}

module.exports = new CustomerService();