import React, { Component } from 'react';
import './Event.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



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
            <Card className='event event-details-outer-container'>
                <Card.Title>{event.summary}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Location: {event.location}</Card.Subtitle>
                <Card.Text>
                    {event.description}
                </Card.Text>
                <Button  onClick={this.clickEventDetails} size="sm" style={{width: '20%'}}>
                    <span className={showDetails ? 'show-details-btn' : 'show-details-btn visible'}> show details </span>
                    <span className={showDetails ? 'hide-details-btn visible' : 'show-details-btn'}> hide details </span>
                </Button>
                <div className={showDetails ? 'event-details-inner-container visible' : 'event-details-inner-container'}>
                    <p className='event-start'>From: {event.start.dateTime}</p>
                    <p className='event-end'>Until: {event.end.dateTime}</p>
                </div>
            </Card>
        )
    }
}
export default Event;