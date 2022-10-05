# MeetUp-App📍

Meet and connect with people who share the same interest

## Objectives

    Build a serverless React PWA (for online and offline use).
    Follow a BDD & TDD methodology (scenarios & stories, red-green-refactor, quick feedback).
    Fetch event data from Google Calendar API.
    Data visualisation (number of upcoming events, & popularity of event genres)

## Context

    Serverless allows: less backend maintenance, increased scalability, high availability.
    PWA's allow: instant loading, offline availability, and cross-platform features.

## Features

1. Search events by city

Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.

    User Story: As a user, I should be able to filter events by city, so that I can see the list of events that take place in that city.

Given user hasn't serached for any city,

When the user opens the app,

Then the user should see a list of all upcoming events.

Scenario 2: User should see a list of suggestions when they search for a city.

    User Story: As a user, I should be able to see a list of suggestsions when I start typing, so that events that I am show are near my location.

Given the main page is open,

When the user starts typing in the city textbox,

Then the user should see a list of cities (suggestions) that match what they've typed.

Scenario 3: User can select a city from the suggested list.

    User Story: As a user, I should be able to select a city from the sugessted list, so that I can see events relevant to my location.

Given city suggestsions are visible after a user typed something in the city textbox,

When the user selects a city from the list,

Then user's city should be changed to their selection, and be shown that city's list of events

2. Toggle info visibility

Scenario 1: An event element is collapsed by default

    User Story: As a user, I should see a list of events without details, so that I can quickly get an overview of what is available.

Given a user has searched for a city,

When the list of events is shown,

Then all events details should be hidden.

Scenario 2: User can expand an event to see its details

    User Story: As a user, I should be able to reveal event details, so that I can get a more in-depth idea of what the event is about.

Given a list of unexpanded events are shown,

When a user clicks on an event,

Then event details should be revealed.

Scenario 3: User can collapse an event to hide its details

    User Story: As a user, I should be able to hide event details, so that I can go back to seeing the main overview of available events.

Given an event has had its details expanded,

When a user hides details,

Then the event's details should collapse.

3. Select number of events to show

Scenario 1: When user hasn’t specified a number, 32 is the default number

    User Story: As a user, I should be able to see a list of events by default, so that I can get started searching immediately.

Given a number of events to be shown has not been specified,

When a user searches for events in a city,

Then a list of 32 events should be shown.

Scenario 2: User can change the number of events they want to see

    User Story: As a user, I should be able to change the number of events shown, so that I can choose whether many or few are shown.

Given a list of events is shown,

When a user specifies a number of events to show,

Then the list should match the chosen number.

4. Available offline

Scenario 1: Show cached data when there’s no internet connection

    User Story: As a user, I should be able to access the app offline, so that I can view events even on a patchy connection or when I've run out of data.

Given the app is live,

When connection to internet is lost,

Then app should still work by showing data taken from an offline cache.

Scenario 2: Show error when user changes the settings (city, time range)

    User Story: As a user, I should be able to see an error message when I do something wrong, so that I can go back to being able to use the app.

Given default time and city settings,

When a user changes city and time settings,

Then an error message should be displayed.

5. Data visualisation

Scenario 1: Show a chart with the number of upcoming events in each city

    User Story: As a user, I should be able to see a data visualisation of upcoming events, so that I can better and more easily understand the situation.

Given a city has been chosen,

When a user chooses to view data on upcoming events,

Then appropriate charts and data visualisations should be displayed.
