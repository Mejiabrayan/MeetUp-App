Feature: Specify Number of Events

    Scenario: 32 is the default number length
        Given a user hasn't specified a number of events
        When the user searches a list of events in the city
        Then a list of thirty two events in the city

    Scenario: User can change the number of events they want to see
        Given a user has specified a number of events
        When the user searches a list of events in the city
        Then the number of events is the number specified by the user
