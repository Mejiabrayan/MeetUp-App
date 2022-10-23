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

<<<<<<< HEAD
=======
  // Update events based on city selected by user
>>>>>>> integrationTest
  handleInputChanged = (e) => {
    const value = e.target.value;
    this.setState({
      totalEvents: value
    })
  }
<<<<<<< HEAD
  // updates the state of events
  updateEvents = (location) => {
=======

  // 
  updateEvents = (location, eventCount = this.state.totalEvents) => {
>>>>>>> integrationTest
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
<<<<<<< HEAD
        events: locationEvents
=======
        events: locationEvents.slice(0, eventCount)
>>>>>>> integrationTest
      });
    });
  }

<<<<<<< HEAD

=======
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) })
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }
>>>>>>> integrationTest
  render() {
    const { events, locations, totalEvents } = this.state;
    return (
      <div className="App">
        <h1> MeetUp 📍 </h1>
        <h3> Find events near you </h3>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents totalEvents={totalEvents} handleInputChanged={this.handleInputChanged} />
<<<<<<< HEAD
        <EventList events={events.slice(0, totalEvents)} />
=======
        <EventList events={events} />
>>>>>>> integrationTest
      </div>
    );
  }
}

export default App;
