import React, { Component } from 'react';

// The code is a component that displays the number of events in an input field.
class NumberOfEvents extends Component {

    render() {
        const { totalEvents, handleInputChanged } = this.props
        return (
            <div className='numberOfEvents'>
                <label>
                    Number of Events:
                    <input
                        className='input-number'
                        type='number'
                        min='1'
                        value={totalEvents}
                        onChange={handleInputChanged}
                    />
                </label>
            </div>
        )
    }
}
export default NumberOfEvents;