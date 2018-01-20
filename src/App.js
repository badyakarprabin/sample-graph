import React from 'react';
import './App.css';
import TimeLine from './TimeLine';
import Guage from './Gauge';

import { core as ZingChart } from 'zingchart-react';
import Gauge from './Gauge';

// Component which contains the dynamic state for the chart
const App = () => {
  return (
    <div className="App">
      <Gauge />
      <TimeLine />

    </div>
  );
}

export default App;