import React, { Component } from 'react';
import { core as ZingChart } from 'zingchart-react';

var myConfig = {
    backgroundColor: 'none',
    type: "gauge",
    plot: {
        arperture: 180,
        csize: 4,
        backgroundColor: 'none',
        tooltip: {
            visible: false
        }
    },
    plotarea: {
        backgroundColor: 'none',
        borderWidth: 0,
        margin: "100 0 0 0"
    },
    scaleR: {
        minValue: -10.00,
        maxValue: 10.00,
        step: 5,
        aperture: 180,
        backgroundColor: 'none',
        item: {
            padding: 5,
            fontColor: "#1E5D9E",
            fontFamily: 'Montserrat',
            offsetR: 0
        },
        tick: {
            lineColor: '#D1D3D4',
            placement: 'out',
            lineColor: '#1E5D9E'
        },
        "minor-ticks": 5,
        "minor-tick": {
            "line-color": "white",
            "visible": true,
            "size": 7,
            "placement": "inner"
        },
        center: {
            size: 0,
            borderColor: 'none',
            backgroundColor: 'none'
        },
        ring: {
            size: 3,
            rules: [
                {
                    rule: '%v < -5',
                    backgroundColor: '#00BAF2'
                },
                {
                    rule: '%v >= -5 && %v < -0',
                    backgroundColor: '#1E5D9E'
                },
                {
                    rule: '%v >= 0 && %v < 5',
                    backgroundColor: '#9B26AF'
                },
                {
                    rule: '%v >= 5',
                    backgroundColor: '#E80C60'
                }
            ]
        }
    },
    series: [
        {
            "animation": {
                "method": 5,
                "effect": 2,
                "speed": 2500
            },
            text: "Internal",
            values: [10],
            lineColor: "#00BAF2",
            backgroundColor: "#1E5D9E",
        },

    ]
};
var myDataSimple = {
    "type": "gauge",
    backgroundColor: 'none',
    "scale-r": {
        "values": "-10:10:5",
        "line-color": "none",
        "guide": {
            "background-color": "black", // Set the interior color of the gauge so that it is solid black, not alternating colors
            "alpha": 1
        },
        "tick": {
            "line-width": 3,
            "line-color": "white",
            "size": 14
        },
        "minor-ticks": 5,
        "minor-tick": {
            "line-color": "white",
            "visible": true,
            "size": 7,
            "placement": "inner"
        },
        "item": {
            "color": "white", // Set the color and font of the labels
            "placement": "inner",
            "offset-r": -55 // Move the labels to the inside
        },
        "aperture": 200,
        "center": {
            "background-color": "#CC0000",
            "size": 11
        },
        "background-color": "black",
        "ring": {
            "type": "circle",
            "size": 8,
            "rules": [
                {
                    "rule": '%v >= -10 && %v < 0',
                    "background-color": "red",
                    "border-width": 0
                },
                {
                    "rule": "%v>=0",
                    "background-color": "green",
                    "border-width": 0
                }
            ]
        }
    },
    "labels": [
        {
            "text": "100%",
            "color": "white",
            "width": "6%",
            "x": "47%",
            "y": "76%"
        }
    ],
    "series": [
        {
            "animation": {
                "method": 5,
                "effect": 2,
                "speed": 2500
            },
            "values": [0],
            "background-color": "limeGreen",
            "shadow": false,
            "size": 100, // Set the length of the needle
            "csize": 10 // Set the width of the needle
        }
    ],
    //real-time feed
    refresh: {
        type: 'feed',
        transport: 'js',
        url: 'feed()',
        interval: 3000
    },
};

window.feed = function (callback) {
    var tick = {};
    tick.plot0 = Math.ceil((Math.random() * 10));
    callback(JSON.stringify(tick));
};

class Gauge extends Component {
    render() {

        return (
            <div className="container">
                <div className='header'>Analog Meter : Sample Meter </div>
                <div className="rows">
                    <div className='col-lg-6'>
                        <ZingChart id="chart1" height="300" width="600" data={myDataSimple} />
                    </div>
                    <div className='col-lg-6'>
                        <ZingChart id="chart2" height="300" width="600" data={myConfig} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Gauge;