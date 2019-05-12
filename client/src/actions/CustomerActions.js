// Constants
import AppConstants from '../constants/AppConstants'
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

class CustomerActions {

    listOrders(customerName) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.CUSTOMER_LIST_ORDERS,
            payload : customerName
        });
    }

    sendOrder(order) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.CUSTOMER_SEND_ORDER,
            payload : order
        });
    }

    payOrder(orderId) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.CUSTOMER_PAY_ORDER,
            payload : orderId
        });
    }
}

export default new CustomerActions();