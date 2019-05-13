//  External dependencies
import React from 'react'
// Stores
import CustomerStore from "../store/CustomerStore";

class CustomerNameForm extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = { name : CustomerStore._name }
    }

    _onChange() {
        this.setState({name : CustomerStore._name });
    }

    componentDidMount() {
        CustomerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        CustomerStore.removeChangeListener(this._onChange)
    }

    render() {
        return(
            <div className="row">
                <div className="col-4">Customer Name</div>
                <div className="col-8">
                    <input
                        onChange={(event) => {
                            this.state.name = event.target.value;
                            this.setState({name : this.state.name });
                            CustomerStore._name = this.state.name;
                        }}
                        type="text"/>
                </div>
            </div>
        );
    }
}

export default CustomerNameForm