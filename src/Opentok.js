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
            sessionId: '1_MX40NjA0NDM3Mn5-MTUxNjY0MjM0MDQ4N35sYkJwemRjV3duem9KQlRDUlVmM3BFQnZ-fg',
            token: 'T1==cGFydG5lcl9pZD00NjA0NDM3MiZzaWc9MTZlNjA2ODhiNTQ4YjQ4NDY3N2E5Y2ViODc5MjE5NTg0NWUzNmYzNDpzZXNzaW9uX2lkPTFfTVg0ME5qQTBORE0zTW41LU1UVXhOalkwTWpNME1EUTROMzVzWWtKd2VtUmpWM2R1ZW05S1FsUkRVbFZtTTNCRlFuWi1mZyZjcmVhdGVfdGltZT0xNTE2NjQyMzU3Jm5vbmNlPTAuMzAzOTgwMzk1NDk4MzA2MjQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUxNjY0NTk1NyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==',
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
                        <OTSubscriber
                            key={stream.id}
                            session={this.sessionHelper.session}
                            stream={stream}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Opentok;