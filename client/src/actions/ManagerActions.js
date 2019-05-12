// Constants
import AppConstants from '../constants/AppConstants'
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

class ManagerActions {

    listOrders() {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.MANAGER_LIST_ORDERS,
            payload : null
        });
    }

    listOrdersFromUser(customer) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.MANAGER_VIEW_CUSTOMER,
            payload : customer
        });
    }

    checkPayment(orderId) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.MANAGER_CHECK_PAYMENT,
            payload : orderId
        });
    }

    organizeInstallation(orderId) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.MANAGER_ORGANIZE_INSTALLATION,
            payload : orderId
        });
    }

    createInvoice(orderId) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.MANAGER_CREATE_INVOICE,
            payload : orderId
        });
    }

    checkStatistics() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.MANAGER_CHECK_STATISTICS,
            payload: null
        })
    }
}

export default new ManagerActions();