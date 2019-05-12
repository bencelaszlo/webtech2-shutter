// External dependencies
import React from 'react';
// Styles
import './App.scss';
// Components
import SidebarMenu from './components/SidebarMenu';
import WorkerOrderList from "./components/WorkerOrderList";

function App() {
  return (
    <div className="App container-fluid bg-dark">
        <div className="row">
            <div className="col-md-4" id="sideBar">
                <SidebarMenu/>
            </div>
            <div className="col-md-8" id="mainContent">
                <WorkerOrderList/>
            </div>
        </div>
    </div>
  );
}

export default App;
