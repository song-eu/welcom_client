import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import * as d3 from 'd3';
import VisitOutpatient from './components/visitOutpatient';

const App = () => {
  return (
    <div className="App">
      <Router>  
        <Route exact path="/" component = {VisitOutpatient}/>
      </Router>
    </div>
  );
}

export default App;
