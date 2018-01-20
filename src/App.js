import React from 'react';
import { core as ZingChart } from 'zingchart-react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

import './App.css';
import Gauge from './Gauge';
import TimeLine from './TimeLine';

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
      <Gauge />
      <TimeLine />
    </div>
  );
}

export default App;