import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  legend,
  ResponsiveContainer
} from 'recharts';
import React, { Component } from 'react';
import Menu from './menu'
import EventGenre from './EventGenres';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';
import { extractLocations, getEvents, getAccessToken, checkToken } from './api'
import { WarningAlert } from './Alerts';
import WelcomeScreen from './WelcomeScreen';
import './App.css';
import './nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
    totalEvents: 32,
    errorAlert: '',
    warningText: ' Limit of 32 events reached',
    showWelcomeScreen: undefined

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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParameter = new URLSearchParams(window.location.search)
    const code = searchParameter.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map(location => {
      const number = events.filter(event => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number }
    })
    return data;

  }

  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const { events, locations, totalEvents } = this.state;

    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    // Checks if the user is online or offline
    if (!navigator.onLine) {
      return (
        <div className="App">
          <WarningAlert text={`You are currently offline. Please connect to the internet to see the full list of events.`} />
          <h2> Find events near you </h2>
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <NumberOfEvents totalEvents={totalEvents}
            handleInputChanged={this.handleInputChanged}
            errorText={this.state.errorText}
            warningText={this.state.warningText} />

          <div className='data-vis-wrapper'>
            <EventGenre events={events} />

            <ResponsiveContainer height={400} >
              <ScatterChart
                margin={{
                  top: 20, right: 20, bottom: 20, left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis type="number" dataKey="number" name="number of events" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <EventList events={events.slice(0, totalEvents)} />
          <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        </div>

      );
    }
    else {
      return (
        <>
          <div className="App">
            <Menu />
            <div className='hero-section'>
              <h2 className=
                'hero-section-heading' > Find Events Near You  <br />& Meet Like-Minded Developers </h2>
              <div className='right-content'>
                <img src='https://img.freepik.com/free-vector/current-location-concept-illustration_114360-4406.jpg?w=740&t=st=1668448894~exp=1668449494~hmac=04a5187a51471ebe7c164cce7825fe10cc7c5dfa6006369f33a1b09e5001328e'
                  loading='lazy' />
              </div>
            </div>
              <h3> Choose a city to see events </h3>
            <div className='main-section'>
              <CitySearch locations={locations} updateEvents={this.updateEvents} />
              <NumberOfEvents totalEvents={totalEvents}
                handleInputChanged={this.handleInputChanged}
                errorText={this.state.errorText}
                warningText={this.state.warningText} />
            </div>
            <div className='data-vis-wrapper'>
              <EventGenre events={events} />

              <ResponsiveContainer height={400} >
                <ScatterChart
                  className='recharts-surface'
                  margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis type="category" dataKey="city" name="city" />
                  <YAxis type="number" dataKey="number" name="number of events" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={this.getData()} fill="#f77070" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <EventList events={events.slice(0, totalEvents)} />
            <WelcomeScreen
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        

          </div>
        </>
      );
    }
  }
}

export default App;