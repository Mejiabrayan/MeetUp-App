import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';

import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    test('render details inner container', () => {
        const detailsInnerContainer = EventWrapper.find('.event-details-inner-container');
        expect(detailsInnerContainer).toHaveLength(1);
    })
    test('render details outer container', () => {
        const detailsOuterContainer = EventWrapper.find('.event-details-outer-container');
        expect(detailsOuterContainer).toHaveLength(1)
    })


    test('render event summary correctly', () => {
        expect(EventWrapper.find('.event-summary')).toHaveLength(1)
    })

    test('render event collapsed by default', () => {
        expect(EventWrapper.state('showDetails')).toBe(false);
    });

    test('render only when event is expanded after its clicked event details', () => {
        EventWrapper.setState({
            showDetails: false
        })
        expect(EventWrapper.find('.event-description')).toHaveLength(0)
    })

})