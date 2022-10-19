import React, { Component } from 'react';

class Event extends Component {
    // set the state to do not show details
    clickEventDetails = () => {
        this.setState({ show: !this.state.show })
    };
    // the default state
    state = { show: false }

    render() {
        const { event } = this.props; // our event property


        return <div className='Event'>
            <h1 className='event-summary'>{event.summary}</h1>
            <p className="event-info">
                {event.start.dateTime} {event.start.timeZone} {event.location}
            </p>
            {this.state.show && (
                <div>
                    <h2 className='event-title'>Event Details</h2>
                    <p className='event-description'>{event.description}</p>
                    <a href={event.htmlLink}
                        target='_blank'
                        rel='noreferrer'
                        className='event-link'
                    >see details on Google Calendar</a>
                </div>
            )}
            {!this.state.show ? (
                <button className='show-details-btn'
                    onClick={this.clickEventDetails}>Show Details</button>
            ) : (
                <button className='hide-details-btn' onClick={this.clickEventDetails}>Hide Details</button>
            )}
        </div>
    }
}
export default Event;