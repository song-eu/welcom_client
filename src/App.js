import React from 'react';
import * as d3 from 'd3';

const App = () => {
    d3.selectAll('p').style("color", "blue")
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome dashboard with D3
        </p>
      </header>
    </div>
  );
}

export default App;
