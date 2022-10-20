import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let event, EventWrapper;
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    test('render event summary correctly', () => {
        expect(EventWrapper.find('.event-summary')).toHaveLength(1)
    })
    //  EVENT INFO
    test('render event-info correctly', () => {
        expect(EventWrapper.find('.event-info')).toHaveLength(1)
    })
    test('render event collapsed by default', () => {
        expect(EventWrapper.state('show')).toBe(false);
    });

    test('render event description', () => {
        expect(EventWrapper.find('.event-description')).toHaveLength(0);
    })
    test('render click to show details', () => {
        EventWrapper.setState({
            show: false
        })
        EventWrapper.find('.show-details-btn').simulate('click')
        expect(EventWrapper.state('show')).toBe(true);
    })
    test('render click to collapse event details', () => {
        EventWrapper.setState({
            show: true
        });
        EventWrapper.find('.hide-details-btn').simulate('click');
        expect(EventWrapper.state('show')).toBe(false);
    });

    test('render only when event is expanded after its clicked event details', () => {
        EventWrapper.setState({
            show: false
        })
        expect(EventWrapper.find('.event-description')).toHaveLength(0)
    })
    test('render event of mock event data correctly', () => {
        expect(EventWrapper.find('.event-info').text()).toBe(
            `${event.start.dateTime} ${event.start.timeZone} ${event.location}`
        )
    })
})