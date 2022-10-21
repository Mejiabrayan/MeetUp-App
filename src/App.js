import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';
import { extractLocations } from './api'

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
  render() {
    const { events, locations, totalEvents } = this.state;
    return (
      <div className="App">
        <h1> MeetUp 📍 </h1>
        <h3> Find events near you </h3>
        <CitySearch locations={locations} />
        <NumberOfEvents totalEvents={totalEvents} handleInputChanged={this.handleInputChanged} />
        <EventList events={events.slice(0, totalEvents)} />
      </div>
    );
  }
}

export default App;
