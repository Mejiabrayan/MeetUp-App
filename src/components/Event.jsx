import React, { Component } from 'react';


export class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
  }

  clickEventDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  render() {
    const { showDetails } = this.state;
    const { event } = this.props;

    return (
      <div className='flex flex-wrap justify-center items-center'>
        <div className='w-full max-w-md m-2'>
          <div className='rounded-md shadow-md'>
            <div className='p-4'>
              <h3 className='text-lg font-bold '>{event.summary}</h3>
              <div className='text-sm '>Location: {event.location}</div>
              <p className='mt-2  text-sm'>{event.description}</p>
            </div>
            <div className='border-t border-gray-200 px-4 py-3'>
              <div className='flex justify-between'>
                <button className='bg-red-500 text-white rounded-full px-2 font-bold' onClick={this.clickEventDetails}>
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              <div
                className={
                  showDetails
                    ? 'event-details-inner-container visible'
                    : 'event-details-inner-container'
                }
              >
                <p className='event-start mt-2 text-sm '>
                  Start Date From: {event.start.dateTime}
                </p>
                <p className='event-end mt-2 text-sm '>
                  Until: {event.end.dateTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    

  }
}

export default Event;
