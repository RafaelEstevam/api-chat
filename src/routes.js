import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Chat from './views/chat/chat.view';
import ChatBkp from './App';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Chat} />
      <Route path="/chat" exact component={ChatBkp} />
      <Route path="*" component={() => <h1> 404 </h1>} />
    </Switch>
  );
}

export default Routes;