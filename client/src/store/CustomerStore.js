import {EventEmitter} from 'events'

class CustomerStore extends EventEmitter {

    _windowWidth = {};
    _windowHeight = {};
    _orders = [];
    _name = {};
    _shoppingCart = [];

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

export default new CustomerStore();