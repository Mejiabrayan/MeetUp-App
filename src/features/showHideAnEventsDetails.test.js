import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;

    beforeAll(() => {
        AppWrapper = mount(<App />)
    });

    afterAll(() => {
        AppWrapper.unmount();
    });

    test('An event element is collapsed by default', ({ given, when, then }) => {
        given('the user has searched for a city', () => {
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } })
            AppWrapper.find('.suggestions li').first().simulate('click');
        });
        when('the user clicks the event\'s details', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event-details-inner-container').first()).toBeDefined()
        });
        then('the event\'s details should be hidden', () => {
            expect(AppWrapper.find('.event-details-inner-container').hasClass('visible')).toBe(false);
        });
    });
    test('User can collapse an event to show it\'s details', ({ given, when, then }) => {
        given('a list of uncollapsed events are shown', () => {
            ;
        });

        when('the user clicks the event details', () => {
            AppWrapper.find('.show-details-btn').first().simulate('click');
        });

        then('the event details will show', () => {
            expect(AppWrapper.find('.event-details-inner-container').hasClass('visible')).toBe(true);
        });
    });
    test('User can collapse an event to hide it\'s details', ({ given, when, then }) => {
        given('an event has had it\'s details expanded', () => {

        });

        when('a user hides details', () => {
            AppWrapper.find('.hide-details-btn').first().simulate('click');
        });

        then('the event\'s details should collapse', () => {
            expect(AppWrapper.find('.event-details-inner-container').hasClass('visible')).toBe(false);
        });
    });
})