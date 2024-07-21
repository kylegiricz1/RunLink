import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
