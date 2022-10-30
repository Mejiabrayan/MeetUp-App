import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/SpecifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;

    beforeAll(() => {
        AppWrapper = mount(<App />)
    });

    afterAll(() => {
        AppWrapper.unmount();
    });

    test('32 is the default number length', ({ given, when, then }) => {
        given('a user hasn\'t specified a number of events', () => {

        });

        when('the user searches a list of events in the city', () => {
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } })
            AppWrapper.find('.suggestions li').first().simulate('click');
        });

        then('a list of thirty two events in the city', () => {
            const eventNumber = AppWrapper.find('.input-number').instance().value;
            expect(parseInt(eventNumber)).toEqual(32);
        });
    });


    test('User can change the number of events they want to see', ({ given, when, then }) => {
        given('a user has specified a number of events', () => {

        });

        when('the user searches a list of events in the city', () => {
            AppWrapper.find('.input-number').simulate('change', { target: { value: 1 } })
        });

        then('the number of events is the number specified by the user', () => {
            const eventList = AppWrapper.find('.EventList li');
            const eventNumber = AppWrapper.find('.input-number').instance().value;
            expect(parseInt(eventNumber)).toEqual(eventList.length);
        });
    });

})