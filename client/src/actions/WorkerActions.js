import AppConstants from '../constants/AppConstants'
import AppDispatcher from '../dispatcher/AppDispatcher'

class WorkerActions {

    listOrders() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LIST_ORDERS,
            payload: null
        });
    }

}

export default new WorkerActions();