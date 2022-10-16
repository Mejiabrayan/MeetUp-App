import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

function App() {
  return (
    <div className="App">
      <h1> Hello, this is MeetUp 📍 </h1>
      <EventList />
      <CitySearch />
    <NumberOfEvents />

    </div>
  );
}

export default App;
