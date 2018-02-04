import React, { Component } from 'react';
import * as classNames from 'classnames';

import 'opentok-solutions-css';
import AccCore from 'opentok-accelerator-core';

const API_KEY = '46044372';
const SESSION_ID = '2_MX40NjA0NDM3Mn5-MTUxNzAzNTM5MzAzOX5FWkxWNUNGSFNtVFNoZE5PVGdxaHh3ZU5-fg';
const TOKEN = 'T1==cGFydG5lcl9pZD00NjA0NDM3MiZzaWc9OTUzNGY0NTNhZDI4MTBkNjMyODc0NDMwOTBiZTNkMjhmYTRmZjBjZTpzZXNzaW9uX2lkPTJfTVg0ME5qQTBORE0zTW41LU1UVXhOekF6TlRNNU16QXpPWDVGV2t4V05VTkdTRk50VkZOb1pFNVBWR2R4YUhoM1pVNS1mZyZjcmVhdGVfdGltZT0xNTE3MDM1NDQ1Jm5vbmNlPTAuMDMxMjY4OTYwOTY2MTM5MTgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUxOTYyNzQ0NCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';

let otCore;
const otCoreOptions = {
    streamContainers(pubSub, type, data, stream) {
        return {
            publisher: {
                camera: '#cameraPublisherContainer',
            },
            subscriber: {
                camera: '#cameraSubscriberContainer',
            },
        }[pubSub][type];
    },
    credentials: {
        apiKey: API_KEY,
        sessionId: SESSION_ID,
        token: TOKEN,
    },
    communication: {
        autoSubscribe: true,
        subscribeOnly: false,
        connectionLimit: null,
        callProperites: {
            style: {
                buttonDisplayMode: true
            },
            showControls: true
        }
    },
    name: 'test',
    controlsContainer: '#controls',
    packages: ['textChat'],
    textChat: {
        name: ['Demo-Ram', 'Demo-Hari', 'Demo-Shyam', 'Demo-Krishna'][Math.random() * 4 | 0], // eslint-disable-line no-bitwise
        waitingMessage: 'Messages will be delivered when other users arrive',
        container: '#chat',
    }
};

class Opentok extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubscriber: false,
            isActive: false
        }
    }

    componentDidMount() {
        otCore = new AccCore(otCoreOptions);
        otCore.connect()
            .then(({ publishers, subscribers, meta }) => {
                this.setState({
                    isActive: true,
                    isOnCall: false,
                })
            });
        otCore.on('streamCreated', (event) => {
            this.setState({
                isSubscriber: true
            })
            otCore.subscribe(event.stream)
        });
        otCore.on('streamDestroyed', (event) => {
            console.log('destryoed');
            this.setState({
                isSubscriber: false
            })
            otCore.unsubscribe(event.stream)
        });

    }

    startCall() {
        this.setState({
            show: true
        })
        otCore.startCall()
            .then(({ publishers, subscribers, meta }) => {
                this.setState({
                    isOnCall: true
                })
            })
    }

    endCall() {
        this.setState({
            show: true
        })
        otCore.endCall();
        this.setState({
            isOnCall: false,
            isSubscriber: false
        })
    }

    toggleLocalAudio() {
        otCore.toggleLocalAudio(false);
    }

    render() {
        console.log('tewt');
        let { isOnCall, isSubscriber, show } = this.state;
        let active = classNames({
            'disabled': !this.state.isActive
        })
        return (
            <div>
                <div className='container'>
                    <div className='col-lg-12'>
                        <div className='row'>
                            <div className={show ? 'col-lg-5 col-xs-12' : ""}>
                                <div className="App-video-container">
                                    {isOnCall && <div className='text-info'> You on live </div>}
                                    <div id="cameraPublisherContainer"
                                        className={isOnCall ? 'publisherContainer' : ''} />
                                </div>
                            </div>
                            <div className={show ? 'col-lg-2 col-xs-12' : isSubscriber ? 'col-lg-5 col-xs-12' : ''}>
                                <div className="App-video-container">
                                    {!isOnCall && isSubscriber && <div className='text-info col-xs-2'>You are currently watching, Click button to start sharing</div>}


                                    <div id="cameraSubscriberContainer"
                                        className={isOnCall ? 'subscriberContainer' : isSubscriber ? 'publisherContainer' : ''} />
                                </div>
                            </div>
                            <div className='col-lg-offset-9'>
                                <div id="chat" className="App-chat-container" />
                            </div>
                        </div>

                        <div className='row app-container'>
                            <div id='controls' className='col-lg-5 App-control-container'>
                                {this.state.isOnCall &&
                                    <div>
                                        <div className="ots-video-control circle end-call" onClick={() => this.endCall()} />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='row start-call'>
                            <div className='col-lg-5'>
                                {this.state.isActive ?
                                    this.state.isOnCall ?
                                        <button disabled className='btn btn-success'> On Call </button>
                                        :
                                        <button className='btn btn-primary animated bounce' onClick={() => this.startCall()} >
                                            Start sharing your video </button> :
                                    <button className='btn btn-warning' disabled> Loading.... </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Opentok;