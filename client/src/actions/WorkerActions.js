// Constants
import AppConstants from '../constants/AppConstants'
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';

class WorkerActions {

    listOrders() {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.WORKER_LIST_ORDERS,
            payload : null
        });
    }

    listParts(orderId) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.WORKER_LIST_PARTS,
            payload : orderId
        });
    }

    assembleShutter(orderId) {
        AppDispatcher.handleViewAction({
            actionType : AppConstants.WORKER_ASSEMBLE_SHUTTER,
            payload : orderId
        });
    }
}

export default new WorkerActions();