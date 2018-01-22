import React, { Component } from 'react';

import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from 'opentok-react';

class Opentok extends React.Component {
    constructor(props) {
        super(props);
        this.state = { streams: [] };
    }

    componentWillMount() {

        this.sessionHelper = createSession({
            apiKey: '46044372',
            sessionId: '1_MX40NjA0NDM3Mn5-MTUxNjYzMzIzMTAwMH40Ry9BWUVHYWJrYVRhdkE0ZUtYV0cxTkt-fg',
            token: 'T1==cGFydG5lcl9pZD00NjA0NDM3MiZzaWc9NzYyN2RkNDEyZjE4OTdiOWQ3ZTAyMzljMGZmMjExM2RhOTM2NDhmODpzZXNzaW9uX2lkPTFfTVg0ME5qQTBORE0zTW41LU1UVXhOall6TXpJek1UQXdNSDQwUnk5QldVVkhZV0pyWVZSaGRrRTBaVXRZVjBjeFRrdC1mZyZjcmVhdGVfdGltZT0xNTE2NjMzMzUxJm5vbmNlPTAuOTA3OTQ4NzI4NTE3OTY5NSZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNTE2NjM2OTUwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9',
            onStreamsUpdated: streams => { this.setState({ streams }); }
        });
    }

    componentWillUnmount() {
        this.sessionHelper.disconnect();
    }

    render() {
        return (
            <div>
                <OTPublisher session={this.sessionHelper.session} />

                {this.state.streams.map(stream => {
                    return (
                        <div id="videos">
                            <div id="subscriber">
                                <OTSubscriber
                                    key={stream.id}
                                    session={this.sessionHelper.session}
                                    stream={stream}
                                /></div>
                            <div id="publisher"></div>
                        </div>

                    );
                })}
            </div>
        );
    }
}

export default Opentok;


