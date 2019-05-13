// External dependencies
import React from 'react';
// Components
import CustomerDefineWindowForm from './CustomerDefineWindowForm';
import CustomerShoppingCart from './CustomerShoppingCart';
// Stores
import CustomerNameForm from "./CustomerNameForm";

class CustomerNewOrder extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    _onChange() {}

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return(
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header">New Order</div>
                    <div className="card-body">
                        <CustomerNameForm/>
                        <CustomerDefineWindowForm/>
                        <CustomerShoppingCart/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CustomerNewOrder;