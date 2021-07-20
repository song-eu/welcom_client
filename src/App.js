import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import * as d3 from 'd3';
import VisitOutpatient from './components/visitOutpatient';

const App = () => {
    d3.selectAll('p').style("color", "blue")
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome dashboard with D3
        </p>
      </header>
      <Router>  
        <Route exact path="/" component = {VisitOutpatient}/>
      </Router>
    </div>
  );
}

export default App;
