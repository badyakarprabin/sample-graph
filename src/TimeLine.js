import React, { Component } from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import { core as ZingChart } from 'zingchart-react';


var myConfig1 = {
    //chart styling
    type: 'line',
    globals: {
        fontFamily: 'Roboto',
    },
    backgroundColor: '#fff',
    title: {
        backgroundColor: '#1565C0',
        text: 'Real-Time Line Chart',
        color: '#fff',
        height: '30x',
    },
    plotarea: {
        marginTop: '80px'
    },
    crosshairX: {
        lineWidth: 4,
        lineStyle: 'dashed',
        lineColor: '#424242',
        marker: {
            visible: true,
            size: 9
        },
        plotLabel: {
            backgroundColor: '#fff',
            borderColor: '#e3e3e3',
            borderRadius: 5,
            padding: 15,
            fontSize: 15,
            shadow: true,
            shadowAlpha: 0.2,
            shadowBlur: 5,
            shadowDistance: 4,
        },
        scaleLabel: {
            backgroundColor: '#424242',
            padding: 5
        }
    },
    scaleY: {
        guide: {
            visible: false
        },
        values: '0:100:25'
    },
    tooltip: {
        visible: true
    },
    //real-time feed
    refresh: {
        type: 'feed',
        transport: 'js',
        url: 'feed()',
        interval: 500
    },
    plot: {
        shadow: 1,
        shadowColor: '#eee',
        shadowDistance: '10px',
        lineWidth: 5,
        hoverState: { visible: false },
        marker: { visible: false },
        aspect: 'spline'
    },
    series: [{
        values: [],
        lineColor: '#2196F3',
        text: 'Blue Line'
    }, {
        values: [],
        lineColor: '#ff9800',
        text: 'Orange Line'
    }]
};


window.feed = function (callback) {
    var tick = {};
    tick.plot0 = parseInt(10 + 90 * Math.random(), 10);
    callback(JSON.stringify(tick));
};

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
            "mouseWheelZoomEnabled": false,
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
                <div className='header'>Personal DaqView Plus : Sample Meter </div>
                <div className="rows">
                    <AmCharts.React style={{ width: "100%", height: "500px" }} options={config} />
                    <div className='secondChart'>
                        <ZingChart id="chart4" height="300" width="600" data={myConfig1} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeLine;