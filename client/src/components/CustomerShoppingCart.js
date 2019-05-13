// External dependencies
import React from 'react';
// Stores
import CustomerStore from "../store/CustomerStore";
// Actions
import CustomerActions from "../actions/CustomerActions";

class CustomerShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = { shoppingCart : []};
    }

    _onChange() {
        this.setState({shoppingCart: CustomerStore._shoppingCart});
    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange);
    }

    sendEveryOrder(orders) {
        for (var i = 0; i < orders.length; i++) {
            CustomerActions.sendOrder(orders[i]);
        }
    }

    render() {
        return(
            <div className="card">
                <div className="card-header">Shopping Cart</div>
                <div className="card-body">
                    <ul className="list-group">
                        {
                        this.state.shoppingCart.map((order)=>{
                            return (
                            <div className="card>">
                                <div className="card-header">Order ID: {order._id}</div>
                                <div className="card-body">
                                    <h5 className="card-title">{order.price} €</h5>
                                </div>
                            </div>)
                        })
                        }
                    </ul>
                </div>
                <button className="btn-warning btn-block" onClick={() => this.sendEveryOrder(CustomerStore._shoppingCart)}>Send Order</button>
                <div className="card-footer"></div>
            </div>
        )
    }
}

export default CustomerShoppingCart