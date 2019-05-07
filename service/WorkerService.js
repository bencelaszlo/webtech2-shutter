var DAO = require('../dao/DAO.js');

class WorkerService {
    listOrders(callback) {
        DAO.readOrders(callback);
    }

    assembleShutter(orderId, callback) {
        DAO.updateOrderAssemble(orderId, callback);
    }

    listPartsByOrder(orderId, callback) {
        DAO.readPartsByOrder(orderId, callback);
    }
}

module.exports = new WorkerService();