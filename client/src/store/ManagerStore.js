import {EventEmitter} from 'events'

class ManagerStore extends EventEmitter{

    _orders = [];
    _ordersFromSelectedUser = null;
    _statistics = {};
    _selectedCustomer = {};
    _selectedOrderPaymentStatus = {};

    emitChange() {
        this.emit('change')
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

}

export default new ManagerStore();