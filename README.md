Objective  To build a serverless, progressive web application (PWA) with React using a  test-driven development (TDD) technique.
The application uses the Google  Calendar API to fetch upcoming events.  

[Link] to Meet App (https://brandontyruspetty.github.io/meet/)

FEATURE 1: FILTER EVENTS BY CITY
User Story:
 As a user
 I should be able to filter events by city
 So that I can see the list of events that can take place in that city
SCENARIO 1: When a user hasn't searched for a specific city, return events for all cities
Given user hasn’t searched for any city 

When the user opens the app 

Then the user should see a list of all upcoming events

SCENARIO 2: User should see a list of suggestions when they search for a city
Given the main page is open 

When user starts typing in the city textbox 

Then the user should see a list of cities (suggestions) that match what they’ve typed

SCENARIO 3: User can select a city from the suggested list
Given the user was typing “Berlin” in the city text box

And the list of suggested cities is showing 

When the user selects a city (e.g., “Berlin, Germany”) from the list 

Then their city should be changed to that city (i.e., “Berlin, Germany”) 

And the user should receive a list of upcoming events in that city

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
User Story:
As a user
I should be able to expand or collapse an event’s additional details
So that I can see details of only the events I am interested in 
SCENARIO 1: An event element is collapsed by default
Given that an event’s info has been loaded 

When the user initially views an event 

Then the event’s details will not be visible

SCENARIO 2: User can expand an event to see its details
Given an event’s info has been loaded 

When the user clicks a collapsed event panel

Then the event’s details will be visible

SCENARIO 3: User can collapse an event to hide its details
Given an event’s info has been loaded 

When the user clicks a “hide” button 

Then the events’s details will collapse and no longer be visible

FEATURE 3: SPECIFY NUMBER OF EVENTS
User Story:
As a user
I should be able to input the number of events returned
So that I can choose how many I want to view at a time
SCENARIO 1: When user hasn’t specified a number, 32 is the default number
Given that a user hasn’t specified a number of events 

When the user runs a search 

Then only a maximum of 32 events are returned 

SCENARIO 2: User can change the number of events they want to see
Given that a user inputs a specific number of events to view 

When the user runs the search  

Then that number of specified events will be the maximum returned

FEATURE 4: USE THE APP WHEN OFFLINE
User Story:
As a user
I should be able to view the app offline
So that I do not need to be connected to the internet in order to use it
SCENARIO 1: Show cached data when there’s no internet connection
Given that there is no internet connection 

When the user opens the app  

Then the user will see cached data from a prior session

SCENARIO 2: Show error when user changes the settings (city, time range)
Given that there is no internet connection 

When the user tries to change the settings that require connectivity  

Then an error message is returned stating that they cannot proceed without an internet connection

FEATURE 5: DATA VISUALIZATION
User Story:
As a user
I should be able to see a visual representation of the event data
So that I can see how many events are happening in a particular locale
SCENARIO 1: Show a chart with the number of upcoming events in each city
Given that there are events occurring in a particular city 

When the user searches for events in that city 

Then a chart will be returned that shows the upcoming number of events specified by type
