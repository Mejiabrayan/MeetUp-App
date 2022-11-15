import React, { Component } from 'react';
import './Event.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';



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
            <Row className='justify-space-around'>
                <Col >
                    <Card className='event event-details-outer-container text-center' >
                        <Card.Title>{event.summary}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Location: {event.location}</Card.Subtitle>
                        <Card.Text>
                            {event.description}
                        </Card.Text>
                        <div onClick={this.clickEventDetails} size="sm" >
                            {showDetails ? <Button variant="outline-primar" size="sm">Hide Details</Button> : <Button variant="outline-primary" size="sm">Show Details</Button>}
                        </div>
                        <div className={showDetails ? 'event-details-inner-container visible' : 'event-details-inner-container'}>
                            <p className='event-start'>Start Date From: {event.start.dateTime}</p>
                            <p className='event-end'>Until: {event.end.dateTime}</p>
                        </div>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default Event;