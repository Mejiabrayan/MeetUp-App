import React, { Component } from 'react';
import Event from './components/Event';

class EventList extends Component {

    // Event prop
    render() {
        const { events } = this.props;
        return (

            <ul className='EventList'>
                {/* {console.log(events)} */}
                {events.map(event =>
                    <li key={event.id}>
                        {/* Within the list elements there are event components */}
                        <Event event={event} />
                    </li>
                )}

            </ul >

        )
    }
}
export default EventList;