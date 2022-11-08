import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';
import { extractLocations, getEvents } from './api'
import { WarningAlert } from './Alerts';
import './nprogress.css';

class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
    totalEvents: 32,
    errorAlert: '',
    warningText: ' Limit of 32 events reached'

  }

  // Update events based on city selected by user
  handleInputChanged = (e) => {
    const value = e.target.value;
    this.setState({ totalEvents: value });

    if (value < 1 || value > 32) {
      this.setState({
        errorText: "Not in range (1 to 32)",
      });
    } else {
      this.setState({
        errorText: "",
      });
    }
    // disable eslint
    if (value === 1 || value === 32) {
      this.setState({
        warningText: "Range limit!",
      });
    } else {
      this.setState({
        warningText: "",
      });
    }
  };

  updateEvents = (location, eventCount = this.state.totalEvents) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount)
      });
    });
  }

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
  render() {
    const { events, locations, totalEvents } = this.state;

    if (!navigator.onLine) {
      return (
        <div className="App">
          <WarningAlert text={`You are currently offline. Please connect to the internet to see the full list of events.`} />
          <h1> MeetUp 📍 </h1>
          <h2> Find events near you </h2>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents totalEvents={totalEvents}
            handleInputChanged={this.handleInputChanged}
            errorText={this.state.errorText}
            warningText={this.state.warningText} />
          <EventList events={events.slice(0, totalEvents)} />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <h1> MeetUp 📍 </h1>
          <h2> Find events near you </h2>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents totalEvents={totalEvents}
            handleInputChanged={this.handleInputChanged}
            errorText={this.state.errorText}
            warningText={this.state.warningText} />
          <EventList events={events.slice(0, totalEvents)} />
        </div>
      );
    }
  }
}

export default App;
