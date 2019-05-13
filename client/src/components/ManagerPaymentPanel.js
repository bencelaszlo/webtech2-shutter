// External dependencies
import React from 'react';
// Stores
import ManagerStore from "../store/ManagerStore";

class ManagerPaymentPanel extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = { selectedOrderPaymentStatus : null};
    }

    renderText(status) {
        if (status) {
            return "Paid";
        } else {
            return "Not paid yet.";
        }
    }

    _onChange() {
        this.setState({selectedOrderPaymentStatus : ManagerStore._selectedOrderPaymentStatus});
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
                <div className="card-header">Payment Status</div>
                <div className="card-body">
                    {this.renderText(ManagerStore._selectedOrderPaymentStatus)}
                </div>
                <div className="card-footer"></div>
            </div>
        )
    }
}

export default ManagerPaymentPanel