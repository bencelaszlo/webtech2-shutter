// External dependencies
import React from 'react'
import ReactDOM from "react-dom";
// Stores
import WorkerStore from "../store/WorkerStore";
// Components
import WorkerOrderList from "./WorkerOrderList";

class PartsList extends React.Component{

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = { parts : {} };
    }

    _onChange(){
        this.setState({parts: WorkerStore._requiredParts});
    }

    componentDidMount(){
        WorkerStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        WorkerStore.removeChangeListener(this._onChange)
    }

    render() {
        return(
            <div className="row">
                <div className="col-12">
                <table className="table table-striped">
                    <caption>Required parts for this order</caption>
                    <tbody>
                    <tr>
                        <td>louvers</td>
                        <td>{this.state.parts.louvers}</td>
                    </tr>
                    <tr>
                        <td>louver pins</td>
                        <td>{this.state.parts.louverPins}</td>
                    </tr>
                    <tr>
                        <td>glue</td>
                        <td>{this.state.parts.glue}</td>
                    </tr>
                    <tr>
                        <td>tilt bar</td>
                        <td>{this.state.parts.tiltBar}</td>
                    </tr>
                    <tr>
                        <td>hinges</td>
                        <td>{this.state.parts.hinges}</td>
                    </tr>
                    </tbody>
                </table>
                <btn className="btn btn-info" onClick={
                    () => ReactDOM.render(React.createElement(WorkerOrderList), document.getElementById('mainContent'))
                }>Back</btn>
                </div>
            </div>
        )
    }
}

export default PartsList