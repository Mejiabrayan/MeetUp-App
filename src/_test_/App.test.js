// src/_test_/App.test.js
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// scoping the App component
describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        // renders the component using shallow() rendering API; renders them shallowly meaning without a DOM and their children
        AppWrapper = shallow(<App />);
    })
    test('render EventList', () => {
        // The expect function, here runs a search using find() for EventList components within AppWrapper
        expect(AppWrapper.find(EventList)).toHaveLength(1)

    });
    // testing city search
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1)
    })
    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1)
    })
})

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState)
        AppWrapper.unmount()
    })

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });
    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    })

    test('EventList length is 32 by default', async () => {
        const AppWrapper = mount(<App />)
        const appEventsState = AppWrapper.state('totalEvents');
        expect(appEventsState).toEqual(32);
        expect(AppWrapper.find(NumberOfEvents).prop('totalEvents')).toEqual(appEventsState);
        expect(AppWrapper.find(EventList).prop('events').length).toBeLessThanOrEqual(appEventsState);
        AppWrapper.unmount();
        });
    
    //
    test('EventList updates when new length is specified in NumberOfEvents', () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
        const EventListWrapper = AppWrapper.find('EventList');
        NumberOfEventsWrapper.simulate('change', {target: {value: 10}})
        expect(EventListWrapper.prop('events').length).toBeLessThanOrEqual(NumberOfEventsWrapper.prop('totalEvents'));
        AppWrapper.unmount();
    })
});
