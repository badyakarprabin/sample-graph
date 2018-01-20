import React from 'react';
import './App.css';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import TimeLine from './TimeLine';
import Guage from './Gauge';

import { core as ZingChart } from 'zingchart-react';
import Gauge from './Gauge';

// Component which contains the dynamic state for the chart
const App = () => {
  return (
    <div className="App">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#home">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            Link
			</NavItem>
          <NavItem eventKey={2} href="#">
            Link
			</NavItem>
        </Nav>
      </Navbar>
      <Gauge />
      <TimeLine />
    </div>
  );
}

export default App;