var DAO = require('../dao/DAO.js');

class WorkerService {
    listOrders(callback) {
        DAO.readOrders(callback);
    }

    viewCustomer(customerName, callback) {
        DAO.readOrdersByCustomerName(customerName, callback);
    }

    createInvoice(customerName, callback) {
        DAO.readOrdersByCustomerName(customerName, callback);
    }

    checkPayment(orderId, callback) {
        DAO.readPaymentStatusById(orderId, callback);
    }

    oraganizeInstallation(orderId, callback) {
        DAO.readNextInstallationTime(orderId, callback);
    }

    deleteOrder(orderId, callback) {
        DAO.removeOrder(orderId, callback);
    }
}

module.exports = new WorkerService();