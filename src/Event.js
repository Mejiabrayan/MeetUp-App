import React, { Component } from 'react';
import './Event.css'


export class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
        }
    }
    clickEventDetails = () => {
        this.setState({ showDetails: !this.state.showDetails })
    }

    render() {
        const showDetails = this.state.showDetails;
        const { event } = this.props; // our event property

        return (
            <div className='event event-details-outer-container'>
                <h2 className='event-summary'>{event.summary}</h2>
                <p>{event.description}</p>
                <p className='event-location'>Location: {event.location}</p>
                <button className='details-toggle' onClick={this.clickEventDetails}>
                    <span className={showDetails ? 'show-details-btn' : 'show-details-btn visible'}> show details </span>
                    <span className={showDetails ? 'hide-details-btn visible' : 'show-details-btn'}> hide details </span>
                </button>
                <div className={showDetails ? 'event-details-inner-container visible' : 'event-details-inner-container'}>
                    <p className='event-start'>From: {event.start.dateTime}</p>
                    <p className='event-end'>Until: {event.end.dateTime}</p>
                </div>
            </div>
        )
    }
}
export default Event;