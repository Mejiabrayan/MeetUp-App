import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';
import { extractLocations, getEvents } from './api'

class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
    totalEvents: 32,
  }

  handleInputChanged = (e) => {
    const value = e.target.value;
    this.setState({
      totalEvents: value
    })
  }
  // updates the state of events
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }


  render() {
    const { events, locations, totalEvents } = this.state;
    return (
      <div className="App">
        <h1> MeetUp 📍 </h1>
        <h3> Find events near you </h3>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents totalEvents={totalEvents} handleInputChanged={this.handleInputChanged} />
        <EventList events={events.slice(0, totalEvents)} />
      </div>
    );
  }
}

export default App;