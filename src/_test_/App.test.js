// src/_test_/App.test.js
import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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
