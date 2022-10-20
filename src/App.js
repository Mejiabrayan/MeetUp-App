import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import {mockData} from './mock-data';
import {extractLocations} from './api'

class App extends Component {
 state = {
  events: mockData,
  locations: extractLocations(mockData)
 }
  render() {
    return (
      <div className="App">
        <h1> MeetUp 📍 </h1>
        <h3> Find events near you </h3>
        <CitySearch  locations={this.state.locations}/>
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
