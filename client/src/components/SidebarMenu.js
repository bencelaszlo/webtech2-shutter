// External dependencies
import React from 'react'
import ReactDOM from "react-dom";
// Components
import CustomerNameForm from "./CustomerNameForm";
import WorkerOrderList from "./WorkerOrderList";
import ManagerOrderList from './ManagerOrderList';
import ManagerStatisticsPanel from "./ManagerStatisticsPanel";
import CustomerNewOrder from "./CustomerNewOrder";
import CustomerActions from "../actions/CustomerActions";
import CustomerStore from "../store/CustomerStore";

class SidebarMenu extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = null;
    }

    _onChange() {};

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return(
        <div class="container-fluid">
            <div className="card">
                <div className="card-header">Customer</div>
                <div className="card-body">
                    <ul className="list-group btn-block">
                        <btn className="btn btn-info" onClick={
                            () => ReactDOM.render(React.createElement(CustomerNewOrder), document.getElementById('mainContent'))
                        }>New Order</btn>
                    </ul>
                    <ul className="list-group btn-block btn-secondary">
                        <CustomerNameForm/>
                    </ul>
                    <ul className="list-group btn-block btn-secondary">
                        <btn className="btn btn-info" onClick={
                            () => CustomerActions.listOrders(CustomerStore._name)
                        }>My Orders</btn>
                    </ul>
                </div>
            </div>
            <div className="card">
                <div className="card-header">Worker</div>
                <div className="card-body">
                    <ul className="list-group btn-block ">
                        <btn className="btn btn-info" onClick={
                            () => ReactDOM.render(React.createElement(WorkerOrderList), document.getElementById('mainContent'))
                        }>List Jobs</btn>
                    </ul>
                </div>
            </div>
            <div className="card">
                <div className="card-header">Manager</div>
                <div className="card-body">
                    <ul className="list-group btn-block ">
                        <btn className="btn btn-info" onClick={
                            () => ReactDOM.render(React.createElement(ManagerOrderList), document.getElementById('mainContent'))
                        }>List Orders</btn>
                        <ul className="list-group btn-block ">
                            <btn className="btn btn-info" onClick={
                                () => ReactDOM.render(React.createElement(ManagerStatisticsPanel), document.getElementById('mainContent'))
                            }>Check Statistics</btn>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}

export default SidebarMenu