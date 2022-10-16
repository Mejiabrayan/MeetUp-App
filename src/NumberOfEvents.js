import React, { Component } from 'react';

// The code is a component that displays the number of events in an input field.
class NumberOfEvents extends Component {
    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            totalEvents: value
        })
    }
    state = { totalEvents: 32 }
    render() {
        return (
            <div className='numberOfEvents'>
                <input className='input-number'
                    type='number'
                    onChange={this.handleInputChanged}
                    value={this.state.totalEvents}
                />
            </div>
        )
    }
}
export default NumberOfEvents;