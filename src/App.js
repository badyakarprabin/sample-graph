import React from 'react';
import { Navbar } from 'react-bootstrap';

import './App.css';
import Gauge from './Gauge';
import TimeLine from './TimeLine';
import Opentok from './Opentok';

// Component which contains the dynamic state for the chart
const App = () => {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">IDS: Sample Graph</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      {/* <Opentok /> */}
      <Gauge />
      <TimeLine />
    </div>
  );
}

export default App;