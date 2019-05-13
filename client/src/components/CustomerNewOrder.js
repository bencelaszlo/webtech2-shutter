// External dependencies
import React from 'react';
// Components
import CustomerDefineWindowForm from './CustomerDefineWindowForm';
import CustomerShoppingCart from './CustomerShoppingCart';
// Stores
import CustomerStore from "../store/CustomerStore";
import CustomerNameForm from "./CustomerNameForm";

class CustomerNewOrder extends React.Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        //this.state = null;
    }

    _onChange() {
        //this.setState({});
    }

    componentDidMount() {
        //CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        //CustomerStore.removeChangeListener(this._onChange)
    }

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