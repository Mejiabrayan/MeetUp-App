import React, { Component } from 'react';

// The code is a component that displays the number of events in an input field.
class NumberOfEvents extends Component {
    state = { totalEvents: 32 }
    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            totalEvents: value
        })
    }
    render() {
        return (
            <div className='numberOfEvents'>
                <label>
                    Number of Events:
                <input className='input-number'
                    type='number'
                    min='1'
                    value={this.state.totalEvents}
                    onChange={this.handleInputChanged}
                />
                </label>
            </div>
        )
    }
}
export default NumberOfEvents;