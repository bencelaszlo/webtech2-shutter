// External dependencies
import React from 'react';
// Stores
import ManagerStore from "../store/ManagerStore";
// Actions
import ManagerActions from "../actions/ManagerActions";

class ManagerStatisticsPanel extends React.Component {

    constructor(props) {
        super(props);
        ManagerActions.checkStatistics();
        this._onChange = this._onChange.bind(this);
        this.state = { statistics : {} };
    }

    _onChange() {
        this.setState({statistics: ManagerStore._statistics} );
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
                <div className="card-header">Statistics</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card-header">Maximum price of orders</div>
                                <div className="card-body text-center">
                                    {this.state.statistics.maxPrice}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-header">Average price of orders</div>
                                <div className="card-body text-center">
                                    {this.state.statistics.avgPrice}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-header">Number of orders</div>
                                <div className="card-body text-center">
                                    {this.state.statistics.orderCount}
                                </div>
                        </div>
                <div className="card-footer"></div>
            </div>
        )
    }
}

export default ManagerStatisticsPanel