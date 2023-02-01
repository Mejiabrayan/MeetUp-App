import React, { Component } from 'react';
import { ErrorAlert, WarningAlert } from '../Alerts';

// The code is a component that displays the number of events in an input field.
class NumberOfEvents extends Component {

    render() {
        const { totalEvents, handleInputChanged, errorText, warningText } = this.props
        return (
            <div className="relative rounded-md shadow-sm">
                <label className="block text-sm font-medium leading-5 text-gray-700">Number of Events:</label>
                <div className="mt-1 rounded-md shadow-sm">
                    <input
                        className="form-input py-3 px-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                        type="number"
                        min="1"
                        value={totalEvents}
                        onChange={handleInputChanged}
                    />
                </div>
                <ErrorAlert text={errorText} className="text-red-500" />
                <WarningAlert text={warningText} className="text-yellow-500" />
            </div>

        )
    }
}
export default NumberOfEvents;