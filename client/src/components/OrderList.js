import React from 'react'
import WorkerStore from '../store/WorkerStore'
import WorkerActions from '../actions/WorkerActions'

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        WorkerActions.fetchOrders();
        this._onChange = this._onChange.bind(this);
        this.state = { orders : WorkerStore._orders};
    }

    _onChange() {
        this.setState({ orders : WorkerStore._orders});
    }

    componentDidMount() {
        WorkerStore.addChangeListener(this._onChange);
    }


    componentWillUnmount() {
       WorkerStore.removeChangeListener(this._onChange());
    }

    render() {
        return(
            <div className="card">
                <div className="card-header">Orders</div>
                <div className="card-body">
                    <ul>
                        {this.state.orders.map( (order) => {
                            return(
                                <li>{order.price}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default new OrderList();