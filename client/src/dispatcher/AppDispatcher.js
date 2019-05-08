import {Dispatcher} from 'flux'
import React from 'react'
import ReactDOM from 'react-dom'

import AppConstants from '../constants/AppConstants'
//import CustomerConstants from '../constants/CustomerConstants'
//import WorkerConstants from '../constants/WorkerConstants'
//import ManagerConstants from '../constants/ManagerConstants'
//import CustomerStore from '../store/CustomerStore'
import WorkerStore from '../store/WorkerStore'
//import ManagerStore from '../store/ManagerStore'
//import OrderListByCustomerName from '../components/OrderListByCustomerName'
import OrderList from '../components/OrderList'

class AppDispatcher extends Dispatcher {

    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            payload: action
        });
    }
}

const dispatcher = new AppDispatcher();

dispatcher.register( (data) => {
   if (data.payload.actionType !== AppConstants.LIST_ORDERS) {
       return;
   }
   fetch('/worker/list', {
       headers : {
           "Content-Type" : "application/json",
           "Accept" : "application/json"
       }
   })
       .then((response) => {return response.json()})
       .then((result) => {
           WorkerStore._orders = result;
           WorkerStore.emitChange();
       })
});

export default dispatcher;