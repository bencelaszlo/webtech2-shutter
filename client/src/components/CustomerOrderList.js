// External dependencies
import React from 'react';
// Stores
import CustomerStore from "../store/CustomerStore";
// Actions
import CustomerActions from "../actions/CustomerActions";
import ReactDOM from "react-dom";
import WorkerOrderList from "./WorkerOrderList";

class CustomerOrderList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = { orders : []};
    }

    _onChange() {
        this.setState({orders: CustomerStore._orders});
    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange);
    }

    render(){
        return(
            <div className="card">
                <div className="card-header">My Orders</div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                            this.state.orders.map((order)=>{
                                return (
                                    <div className="card>">
                                        <div className="card-header">Order ID: {order._id}</div>
                                        <div className="card-body">
                                            <h5 className="card-title">{order.price} €</h5>
                                            <h6 className="card-subtitle mb-2">Customer: {order.customer}</h6>
                                                <btn className="btn-warning btn-block" onClick={() => CustomerActions.payOrder(order._id)}>Pay</btn>
                                        </div>
                                        <btn className="btn btn-info" onClick={
                                            () => ReactDOM.render(React.createElement(WorkerOrderList), document.getElementById('mainContent'))
                                        }>Back</btn>
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

export default CustomerOrderList