import React, { Component } from 'react';
import { OTSession, OTPublisher, OTStreams, OTSubscriber, createSession } from 'opentok-react';

const API_KEY = '46044372';
const SESSION_ID = '1_MX40NjA0NDM3Mn5-MTUxNjgxMTkwNjA1Mn5hdFZ2YnlEZDhRNm16NGR0em1CSnBBWUt-fg';
const TOKEN = 'T1==cGFydG5lcl9pZD00NjA0NDM3MiZzaWc9NjViNTQ0YTdkZmY3YmE5NzgwNDU5NjJmNWEzNDZlZWNjMzk1NmY2NDpzZXNzaW9uX2lkPTFfTVg0ME5qQTBORE0zTW41LU1UVXhOamd4TVRrd05qQTFNbjVoZEZaMllubEVaRGhSTm0xNk5HUjBlbTFDU25CQldVdC1mZyZjcmVhdGVfdGltZT0xNTE2ODExOTMzJm5vbmNlPTAuNzc3MDAxMzQ4NjU4NzcxOSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTE2ODMzNTMxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9';

class Opentok extends React.Component {
    constructor(props) {
        super(props);
        this.state = { streams: [] };
    }

    componentWillUnmount() {
        this.sessionHelper.disconnect();
    }

    render() {
        return (
            <div>
                <OTSession apiKey={API_KEY} sessionId={SESSION_ID} token={TOKEN}>
                    <div>Starter</div>
                    <OTPublisher />

                    <div>Viewer</div>
                    <OTStreams>
                        <OTSubscriber />
                    </OTStreams>
                </OTSession>
            </div>
        );
    }
}

export default Opentok;