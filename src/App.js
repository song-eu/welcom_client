import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import * as d3 from 'd3';
import VisitOutpatient from './components/visitOutpatient';
import {HeaderWrap } from './components/style/backgraound';


const App = () => {
  return (
    <div className="App">
      <HeaderWrap>
          <h1>SNUH Data Dashboard</h1>
      </HeaderWrap>
      <Router>  
        <Route exact path="/" component = {VisitOutpatient}/>
      </Router>
    </div>
  );
}

export default App;
