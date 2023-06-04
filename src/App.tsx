import React from 'react';
import './App.css';
import Routers from './Routes/Routers';
import { Provider } from 'react-redux';
import store from './Redux/index';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routers />
      </div>
    </Provider>
  );
}

export default App;
