// External dependencies
import React from 'react';
// Stores
import ManagerStore from "../store/ManagerStore";
// Actions
import ManagerActions from "../actions/ManagerActions";

class ManagerOrderList extends React.Component {

    constructor(props) {
        super(props);
        ManagerActions.listOrders();
        this._onChange = this._onChange.bind(this);
        this.state = { orders : []};
    }

    _onChange() {
        this.setState({orders: ManagerStore._orders});
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
                <div className="card-header">Orders</div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            this.state.orders.map((order) => {
                                return (
                                    <div className="card>">
                                        <div className="card-header">Order ID: {order._id}</div>
                                        <div className="card-body" id={order._id}>
                                            <h5 className="card-title">{order.price} €</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Customer: {order.customer}</h6>
                                            <div className="btn-group btn-group-vertical">
                                                <btn className="btn-danger btn-block" onClick={() => ManagerActions.createInvoice(order._id)}>Create Invoice</btn>
                                                <btn className="btn-info btn-block" onClick={() => ManagerActions.listOrdersFromUser(order.customer)}>View Customer</btn>
                                                <btn className="btn-danger btn-block" onClick={() => ManagerActions.organizeInstallation(order._id)}>Organize Installation</btn>
                                                <btn className="btn-info btn-block" onClick={() => ManagerActions.checkPayment(order._id)}>Check Payment</btn>
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

export default ManagerOrderList;