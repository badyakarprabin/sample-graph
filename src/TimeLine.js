import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";


// Generate random data
function generateData() {
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 500);
  firstDate.setHours(0, 0, 0, 0);

  var dataProvider = [];

  for (var i = 0; i < 100; ++i) {
    var newDate = new Date(firstDate);
    var date = new Date(newDate.getDate() + i);

    date.setDate(i);

    dataProvider.push({
      date: date,
      value: Math.floor(Math.random() * 10)
    });
  }

  return dataProvider;
}


// Component which contains the dynamic state for the chart
class TimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: generateData(),
      timer: null
    };
  }

  componentDidMount() {
    this.setState({
      // Update the chart dataProvider every 3 seconds
      timer: setInterval(() => {
        this.setState({
          dataProvider: generateData()
        });
      }, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    const config = {
      "type": "serial",
      "theme": "dark",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled": true,
      "graphs": [{
        "id": "g1",
        "balloon": {
          "drop": true,
          "adjustBorderColor": false,
          "color": "#ffffff"
        },
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "value",
        "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
      }],
      "chartScrollbar": {
        "graph": "g1",
        "oppositeAxis": false,
        "offset": 30,
        "scrollbarHeight": 80,
        "backgroundAlpha": 0,
        "selectedBackgroundAlpha": 0.1,
        "selectedBackgroundColor": "#888888",
        "graphFillAlpha": 0,
        "graphLineAlpha": 0.5,
        "selectedGraphFillAlpha": 0,
        "selectedGraphLineAlpha": 1,
        "autoGridCount": true,
        "color": "#AAAAAA"
      },
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha": 1,
        "cursorColor": "#258cbb",
        "limitToGraph": "g1",
        "valueLineAlpha": 0.2,
        "valueZoomable": true
      },
      "valueScrollbar": {
        "oppositeAxis": false,
        "offset": 50,
        "scrollbarHeight": 10
      },
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "dataProvider": this.state.dataProvider
    };

    return (
      <div className="TimeLine">
        <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
      </div>
    );
  }
}

export default TimeLine;