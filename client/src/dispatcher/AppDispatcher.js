// External dependencies
import {Dispatcher} from 'flux'
import React from 'react'
import ReactDOM from 'react-dom'
// Other
import PushNotifications from "../notifications/PushNotifications";
// Constants
import AppConstants from '../constants/AppConstants'
// Stores
import CustomerStore from "../store/CustomerStore";
import WorkerStore from '../store/WorkerStore'
import ManagerStore from '../store/ManagerStore'
// Components
import WorkerPartsList from "../components/WorkerPartsList";
import ManagerOrderListCustomer from "../components/ManagerOrderListCustomer";
import ManagerPaymentPanel from "../components/ManagerPaymentPanel";
import CustomerOrderList from "../components/CustomerOrderList";

class AppDispatcher extends Dispatcher {

    handleViewAction(action) {
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        });
    }

}

const dispatcher = new AppDispatcher();

// WORKER_LIST_ORDERS
dispatcher.register((data) => {
    if(data.payload.actionType !== AppConstants.WORKER_LIST_ORDERS) {
        return;
    }
    fetch('/worker',{
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    }).then(response => { return response.json() } )
        .then(result => {
            WorkerStore._orders = result;
            WorkerStore.emitChange();
        });
});

// WORKER_LIST_PARTS
dispatcher.register((data) => {
    if(data.payload.actionType !== AppConstants.WORKER_LIST_PARTS) {
        return;
    }
    WorkerStore._requiredParts = WorkerStore._orders.find( (order) => {
        return order._id === data.payload.payload;
    });
    fetch('/worker/listParts/' + data.payload.payload,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then((response) => { return response.json() } )
        .then((res) => {
            WorkerStore._requiredParts = res;
            WorkerStore.emitChange();
        });

    ReactDOM.render(
        React.createElement(WorkerPartsList),
        document.getElementById('mainContent'));
    WorkerStore.emitChange();
});

// WORKER_ASSEMBLE_SHUTTER
dispatcher.register((data) => {
    if(data.payload.actionType !== AppConstants.WORKER_ASSEMBLE_SHUTTER){
        return;
    }
    var orderToAssemble = WorkerStore._orders.find( (order) => {
        return order._id === data.payload.payload;
    });
    fetch('/worker/assemble/' + data.payload.payload,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        PushNotifications.pushAssembleNotification(orderToAssemble._id, response);
    });
});

// MANAGER_LIST_ORDERS
dispatcher.register((data) => {
    if(data.payload.actionType !== AppConstants.MANAGER_LIST_ORDERS){
        return;
    }
    fetch('/manager',{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then(response => { return response.json() } )
        .then(result => {
            ManagerStore._orders = result;
            ManagerStore.emitChange();
        });
});

// MANAGER_VIEW_CUSTOMER
dispatcher.register((data) => {
    if (data.payload.actionType !== AppConstants.MANAGER_VIEW_CUSTOMER) {
        return;
    }
    ManagerStore._selectedCustomer = data.payload.payload;
    ManagerStore._ordersFromSelectedUser = ManagerStore._orders.find( (order) => {
        return order.customer === data.payload.payload;
    });
    fetch('/manager/viewCustomer/' + data.payload.payload,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then((response) => { return response.json() } )
        .then((res) => {
            ManagerStore._ordersFromSelectedUser = res;
            ManagerStore.emitChange();
        });

    ReactDOM.render(
        React.createElement(ManagerOrderListCustomer),
        document.getElementById('mainContent'));
    ManagerStore.emitChange();
});

// MANAGER_CREATE_INVOICE
dispatcher.register((data) => {
    if(data.payload.actionType !== AppConstants.MANAGER_CREATE_INVOICE){
        return;
    }
    var orderToInvoice = ManagerStore._orders.find( (order) => {
        return order._id === data.payload.payload;
    });
    fetch('/manager/createInvoice/' + data.payload.payload,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        PushNotifications.pushInvoiceNotification(orderToInvoice._id, response);
    });
});

// MANAGER_CHECK_STATISTICS
dispatcher.register((data) => {
    if(data.payload.actionType !== AppConstants.MANAGER_CHECK_STATISTICS){
        return;
    }
    fetch('/manager',{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then(response => { return response.json() } )
        .then(result => {
            var maxPrice = 0;
            var avgPrice = 0;
            var orderCount = 0;
            for (var i = 0; i < result.length; i++) {
                if (result[i].price > maxPrice) {
                    maxPrice = result[i].price;
                }
                avgPrice += result[i].price;
                orderCount++;
            }
            avgPrice /= orderCount;

            ManagerStore._statistics = {
                "maxPrice": maxPrice,
                "avgPrice": avgPrice,
                "orderCount": orderCount
            };
            ManagerStore.emitChange();
        });
});

// MANAGER_CHECK_PAYMENT
dispatcher.register((data) => {
    if (data.payload.actionType !== AppConstants.MANAGER_CHECK_PAYMENT) {
        return;
    }
    fetch('/manager/checkPayment/' + data.payload.payload,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then(response => { return response.json() } )
        .then(result => {
            var selectedOrder = ManagerStore._orders.find((order) => {
                return order._id === data.payload.payload;
            });
            ManagerStore._selectedOrderPaymentStatus = result;
            ManagerStore.emitChange();

            ReactDOM.render(
                React.createElement(ManagerPaymentPanel),
                document.getElementById(selectedOrder._id));
            ManagerStore.emitChange();
    });
});

// MANAGER_ORGANIZE_INSTALLATION
dispatcher.register((data) => {
    if(data.payload.actionType !== AppConstants.MANAGER_ORGANIZE_INSTALLATION){
        return;
    }
    fetch('/manager/organizeInstallation/' + data.payload.payload,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then(response => { return response.json() } )
        .then(result => {
        PushNotifications.pushInstallationTimeNotification(data.payload.payload, result);
        });
});

// CUSTOMER_LIST_ORDERS
dispatcher.register((data) => {
    if (data.payload.actionType !== AppConstants.CUSTOMER_LIST_ORDERS) {
        return;
    }
    fetch('/customer/list/' + data.payload.payload, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/x-www-form-urlencoded"
        }
    }).then(response => { return response.json() } )
        .then(result => {
            CustomerStore._orders = result;
            CustomerStore.emitChange();
        });

    ReactDOM.render(
        React.createElement(CustomerOrderList),
        document.getElementById('mainContent'));
    CustomerStore.emitChange();
});

// CUSTOMER_SEND_ORDER
dispatcher.register((data) => {
   if (data.payload.actionType !== AppConstants.CUSTOMER_SEND_ORDER) {
       return;
   }
   fetch('/customer/sendOrder/',{
       method : 'POST',
       headers : {
           "Content-Type": "application/x-www-form-urlencoded",
           "Accept": "application/x-www-form-urlencoded"
       },
       body : "tiltBar=" + data.payload.payload.parts.tiltBar + "&"
           + "hinges=" + data.payload.payload.parts.hinges + "&"
           + "louvers=" + data.payload.payload.parts.louvers + "&"
           + "louverPins=" + data.payload.payload.parts.louverPins + "&"
           + "glue=" + data.payload.payload.parts.glue + "&"
           + "price=" + data.payload.payload.price + "&"
           + "customer=" + data.payload.payload.customer
   })
       .then((response) => {return response.json()})
       .then((result) => {
           PushNotifications.pushNewOrderNotification(result.orderId, result.error);
       })
});

// CUSTOMER_PAY_ORDER
dispatcher.register((data) => {
    if (data.payload.actionType !== AppConstants.CUSTOMER_PAY_ORDER){
        return;
    }
    var orderToPay = CustomerStore._orders.find( (order) => {
        return order._id === data.payload.payload;
    });
    fetch('/customer/pay/' + data.payload.payload,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Accept" : "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        PushNotifications.pushPayNotification(orderToPay._id, response);
    });
});

export default dispatcher;