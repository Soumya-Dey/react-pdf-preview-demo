import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<Routing />, document.getElementById('root'));
