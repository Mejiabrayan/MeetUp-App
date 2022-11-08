import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props)
        this.color = null
    }

    getStyle = () => {
        return {
            color: this.color,
            marginTop: 0,
            display: 'contents',
            fontStyle: 'italic'
        }
    }

    render() {
        return (
            <div className='alert' style={this.getStyle()}>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue'
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red'
    }
}


class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'orange'
    }
}


export { Alert, InfoAlert, ErrorAlert, WarningAlert };