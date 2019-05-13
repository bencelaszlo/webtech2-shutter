// External dependencies
import React from 'react';
import ReactDOM from "react-dom";
// Stores
import ManagerStore from "../store/ManagerStore";
// Actions
import ManagerActions from "../actions/ManagerActions";
// Components
import ManagerOrderList from "./ManagerOrderList";

class ManagerOrderListCustomer extends React.Component {

    constructor(props) {
        super(props);
        ManagerActions.listOrdersFromUser(ManagerStore._selectedCustomer);
        this._onChange = this._onChange.bind(this);
        this.state = { orders : [] };
    }

    _onChange() {
        this.setState({ orders: ManagerStore._ordersFromSelectedUser });
    }

    componentDidMount() {
        ManagerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        ManagerStore.removeChangeListener(this._onChange)
    }

    render() {
        return(
            <div className="card">
                <div className="card-header">Orders from {ManagerStore._selectedCustomer}</div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            this.state.orders.map((order) => {
                                return (
                                    <div className="card>">
                                        <div className="card-header">Order ID: {order._id}</div>
                                        <div className="card-body" id={order._id}>
                                            <h5 className="card-title">{order.price} €</h5>
                                            <div className="btn-group btn-group-vertical">
                                                <btn className="btn-danger btn-block" onClick={() => ManagerActions.createInvoice(order._id)}>Create Invoice</btn>
                                                <btn className="btn-danger btn-block" onClick={() => ManagerActions.organizeInstallation(order._id)}>Organize Installation</btn>
                                                <btn className="btn-info btn-block" onClick={() => ManagerActions.checkPayment(order._id)}>Check Payment</btn>
                                                <btn className="btn btn-info" onClick={
                                                    () => ReactDOM.render(React.createElement(ManagerOrderList), document.getElementById('mainContent'))
                                                }>Back</btn>
                                            </div>
                                        </div>
                                    </div>)
                            })
                        }
                    </ul>
                </div>
                <div className="card-footer"></div>
            </div>
        )
    }
}

export default ManagerOrderListCustomer;