import React from 'react';
import './App.css';
import OrderList from './components/OrderList'

function App() {
  return (
    <div className="App container-fluid">
      <header className="App-header">
      </header>
      <div id="content">
        <OrderList />
      </div>
    </div>
  );
}

export default App;
