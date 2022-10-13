import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data'



// This test that ensures there are events within your EventList. 
// scoping the App component
describe('<EventList /> component', () => {
    // test description
    test('render a correct number of events', () => {
        // renders the component using shallow() rendering API; renders them shallowly meaning without a DOM and their childre
        const EventListWrapper = shallow(<EventList events={mockData} />); // mock data which is a list of events that contain four empty objects
        // The expect function, here runs a search using find() for Event components
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length)
    })

});
