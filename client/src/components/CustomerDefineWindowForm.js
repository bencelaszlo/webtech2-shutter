// External dependencies
import React from 'react'
// Stores
import CustomerStore from "../store/CustomerStore";
// Other
import Calculator from "../calculator/Calculator";

class CustomerDefineWindowForm extends React.Component{

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            height : 0,
            width : 0,
            shoppingCart : CustomerStore._shoppingCart
        }
    }

    saveWindowToShoppingCard(width, height) {
        var name = CustomerStore._name;
        var parts = Calculator.calculateParts(width, height);
        var price = Calculator.calculatePrice(parts);
        var newOrder = {
            "parts": parts,
            "customer": name,
            "price": price
        };
        CustomerStore._shoppingCart.push(newOrder);
    }

    _onChange() {
        this.setState({shoppingCart : CustomerStore._shoppingCart});
    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange)
    }

    render(){
        return(
            <div className="row">
                <div className="col-12">

                    <div className="row">
                        <div className="col-4">Width (cm)</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.width = event.target.value;
                                    this.setState({width : this.state.width}
                                    );
                                }}
                                type="number"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">Height (cm)</div>
                        <div className="col-8">
                            <input
                                onChange={(event)=>{
                                    this.state.height = event.target.value;
                                    this.setState({height : this.state.height});
                                }}
                                type="number"/>
                        </div>
                    </div>

                    <btn
                        onClick={()=>{this.saveWindowToShoppingCard(this.state.width, this.state.height)}}
                        className="btn btn-success">
                        Add
                    </btn>
                </div>
            </div>
        );
    }
}

export default CustomerDefineWindowForm