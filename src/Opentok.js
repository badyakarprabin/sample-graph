import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from 'opentok-react';
import AccCore from 'opentok-accelerator-core';
import 'opentok-solutions-css';

const API_KEY = '46044372';
const SESSION_ID = '1_MX40NjA0NDM3Mn5-MTUxNjk0ODAzMjc0N35pNjdCVlVlTVB4VitwR28xTlh4enhyWVR-fg';
const TOKEN = 'T1==cGFydG5lcl9pZD00NjA0NDM3MiZzaWc9MGYxMWU4NDAzY2NmZWNkZDAzNDNjMWNmMDA3NThhMTZjYTk0N2RlNDpzZXNzaW9uX2lkPTFfTVg0ME5qQTBORE0zTW41LU1UVXhOamswT0RBek1qYzBOMzVwTmpkQ1ZsVmxUVkI0Vml0d1IyOHhUbGg0ZW5oeVdWUi1mZyZjcmVhdGVfdGltZT0xNTE2OTQ4MDkyJm5vbmNlPTAuNDA0ODcyNzQ4MjA4MDI3MiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTE3MDM0NDkxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

let otCore;
const otCoreOptions = {
    streamContainers(pubSub, type, data, stream) {
        return {
            publisher: {
                camera: '#cameraPublisherContainer',
                screen: '#screenPublisherContainer',
            },
            subscriber: {
                camera: '#cameraSubscriberContainer',
                screen: '#screenSubscriberContainer',
            },
        }[pubSub][type];
    },
    credentials: {
        apiKey: API_KEY,
        sessionId: SESSION_ID,
        token: TOKEN,
    },
    controlsContainer: '#controls',
    packages: ['textChat'],
    // A container can either be a query selector or an HTML Element
    communication: {
        callProperites: null, // Using default
    },
    textChat: {
        name: ['Test1', 'Test2', 'Test3', 'Test4'][Math.random() * 4 | 0], // eslint-disable-line no-bitwise
        waitingMessage: 'Messages will be delivered when other users arrive',
        container: '#chat',
    }
};

class Opentok extends React.Component {
    constructor(props) {
        super(props);
        this.state = { streams: [] };
    }
    componentDidMount() {

        otCore = new AccCore(otCoreOptions);
        otCore.connect().then(() => otCore.startCall()
            .then(({ publishers, subscribers, meta }) => {
                console.log(publishers, subscribers, meta)
            })
        )
    }

    componentWillUnmount() {
        this.sessionHelper.disconnect();
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-5'>
                        <div className="App-video-container">
                            <div id="cameraPublisherContainer" />
                            <div id="screenPublisherContainer" />
                        </div>
                    </div>
                    <div className='col-lg-2'>
                        <div id="cameraSubscriberContainer" />
                        <div id="screenSubscriberContainer" />
                    </div>
                    <div className='col-lg-offset-9'>
                        <div id="chat" className="App-chat-container" />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-5'>
                        <div id="controls" className="App-control-container">
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Opentok;