import React, { Component } from 'react';

class Event extends Component {
    // the default state
    state = { show: false }
    // set the state to do not show details
    clickEventDetails = () => {
        if (!this.state.show) {
            this.setState({
                show: true,
            })
        } else {
            this.setState({
                show: false,
            })
        }
    };

    render() {
        const { event } = this.props; // our event property

        return (
            <div className='Event'>
                <h2 className='event-summary'>{event.summary}</h2>
                <p className='event-info'>
                    {event.start.dateTime} {event.start.timeZone} {event.location}
                </p>
                {this.state.show ? (
                    <>
                        <div className='details'>
                            <h3 className='details-title'>About Event</h3>
                            <a href={event.htmlLink} className='details-link'>
                                See details on Google Calendar
                            </a>
                            <p className='event-description'>{event.description}</p>
                        </div>
                        <button className='hide-details-btn' onClick={this.clickEventDetails}>Hide Details</button>
                    </>
                ) : (
                    <button className='show-details-btn' onClick={this.clickEventDetails}>Show Details</button>

                )}
            </div>
        )
    }
}
export default Event;