Feature: Show/Hide an Event’s Details

    Scenario: An event element is collapsed by default
        Given the user has searched for a city
        When the user clicks the event's details
        Then the event's details should be hidden

    Scenario: User can collapse an event to show it's details
        Given a list of uncollapsed events are shown
        When the user clicks the event details
        Then the event details will show

    Scenario: User can collapse an event to hide it's details
        Given an event has had it's details expanded
        When a user hides details
        Then the event's details should collapse
