
import React, { Component } from 'react';
import Menu from './components/Menu';
import EventGenre from './EventGenres';
import EventList from './EventList';
import CitySearch from './CitySearch';

import { mockData } from './mock-data';
import { extractLocations, getEvents, getAccessToken, checkToken } from './api'
import { WarningAlert } from './Alerts';
import './App.css';
import './index.css'
import './nprogress.css';

// Components Imports
// import Container from './components/Container';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection'
import ResponsiveScatterChart from './components/ResponsiveScatterChart';



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

        <div>
          <EventList events={events.slice(0, totalEvents)} />
          <WelcomeScreen
            className='WelcomeScreen'
            showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => {
              getAccessToken();
            }}
          />
          <WarningAlert text={`You are currently offline. Please connect to the internet to see the full list of events.`} />
          <h3 className="text-2xl font-bold my-4">Find events near you</h3>

          <div className='data-vis-wrapper flex justify-center'>
            <div className='w-full sm:w-3/4 lg:w-1/2 xl:w-1/3'>
              <EventGenre events={events} />

              <ResponsiveScatterChart data={this.getData()} height={400} />

            </div>
          </div>

        </div>

      );
    } else {
      return (
        <>
          <Menu />
          <div className='bg-primary text-secondary'>
            <HeroSection />
            <div className='inputs items-center'>
              <h3 className='text-2xl text-center my-8 font-bold'>Choose a City to See Events


              </h3>

              <div className='container mx-auto py-8'>
                <div className='relative rounded-md shadow-sm'>
                  <CitySearch
                    className='form-input '
                    locations={locations}
                    updateEvents={this.updateEvents}
                  />
                </div>

              </div>
            </div>
            <EventList events={events.slice(0, totalEvents)} />


            <div className='data-vis-wrapper'>
              <div className='w-full sm:w-3/4 lg:w-1/2 xl:w-1/3'>
                <h2 className='text-2xl font-bold my-4  text-secondary text-center'>Find events near you</h2>

                <EventGenre events={events} />
                <ResponsiveScatterChart data={this.getData()} height={400} />

              </div>
            </div>

            <WelcomeScreen
              className='WelcomeScreen'
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