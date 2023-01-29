import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import React, { Component } from 'react';
import Menu from './components/Menu';
import EventGenre from './EventGenres';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';
import { extractLocations, getEvents, getAccessToken, checkToken } from './api'
import { WarningAlert } from './Alerts';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';
import './index.css'
import './nprogress.css';

// Components Imports
// import Container from './components/Container';
import HeroSection from './components/HeroSection'



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
            <WarningAlert text={`You are currently offline. Please connect to the internet to see the full list of events.`} />
            <h2 className="text-2xl font-bold my-4">Find events near you</h2>
            <CitySearch locations={locations} updateEvents={this.updateEvents} />
            <NumberOfEvents totalEvents={totalEvents}
              handleInputChanged={this.handleInputChanged}
              errorText={this.state.errorText}
              warningText={this.state.warningText} />
            <div className='data-vis-wrapper flex justify-center'>
              <div className='w-full sm:w-3/4 lg:w-1/2 xl:w-1/3'>
                <EventGenre events={events} />

                <ResponsiveContainer height={400} className='bg-white rounded-lg shadow-lg'>
                  <ScatterChart
                    className='p-6'
                    margin={{
                      top: 20, right: 20, bottom: 20, left: 20,
                    }}
                  >
                    <CartesianGrid className='stroke-gray-300' />
                    <XAxis className='text-gray-600' type="category" dataKey="city" name="city" />
                    <YAxis className='text-gray-600' type="number" dataKey="number" name="number of events" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter data={this.getData()} fill="#f77070" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            <EventList events={events.slice(0, totalEvents)} />
            <WelcomeScreen
              className='WelcomeScreen'
              showWelcomeScreen={this.state.showWelcomeScreen}
              getAccessToken={() => {
                getAccessToken();
              }}
            />
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>

              </h3>
              <div className='container mx-auto py-8'>
                <div className='relative rounded-md shadow-sm'>
                  <CitySearch
                    className='form-input '
                    locations={locations}
                    updateEvents={this.updateEvents}
                  />
                </div>
                {/* <div className='relative rounded-md shadow-sm'>
                <NumberOfEvents
                  className='form-input '
                  totalEvents={totalEvents}
                  handleInputChanged={this.handleInputChanged}
                  errorText={this.state.errorText}
                  warningText={this.state.warningText}
                />
              </div> */}
              </div>
            </div>
            <EventList events={events.slice(0, totalEvents)} />


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