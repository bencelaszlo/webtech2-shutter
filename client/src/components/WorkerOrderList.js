// External dependencies
import React from 'react';
// Stores
import WorkerStore from "../store/WorkerStore";
// Actions
import WorkerActions from "../actions/WorkerActions";

class WorkerOrderList extends React.Component {

    constructor(props) {
        super(props);
        WorkerActions.listOrders();
        this._onChange = this._onChange.bind(this);
        this.state = { orders : []};
    }

    _onChange() {
        this.setState({orders: WorkerStore._orders});
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        WorkerStore.removeChangeListener(this._onChange)
    }

    render() {
        return(
        <div className="card">
            <div className="card-header">Orders</div>
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
                                            <div className="btn-group inline pull-left">
                                                <btn className="btn-info btn-block" onClick={() => WorkerActions.listParts(order._id)}>List Required Parts</btn>
                                                <btn className="btn-warning btn-block" onClick={() => WorkerActions.assembleShutter(order._id)}>Assemble This Shutter</btn>
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

export default WorkerOrderList