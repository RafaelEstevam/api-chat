import React, {useState, useEffect} from 'react';
import {AttendantWebSocket} from './websocket/attendant';
import history from './services/history'
import GlobalStyle from './styles/global';
import {Router} from 'react-router-dom';

import Routes from './routes';

let attendantWebSocket = new AttendantWebSocket(); 

function App() {
  return(
    <Router history={history}>
      <GlobalStyle />
      <Routes />
    </Router>
  );
}

export default App;
