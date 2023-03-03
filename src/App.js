
import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    eventCount: 32,
    infoText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token'); 
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code"); 
    
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
     if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0,this.state.eventCount);
        this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, inputNumber) => {
    const {eventCount, seletedLocation} = this.state;
    
    if (location) {
      getEvents().then(events => {
        const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
        const eventsToShow=locationEvents.slice(0, eventCount);
        this.setState({
        events: eventsToShow,
        seletedLocation: location
        });
      });  
    } else {
      getEvents().then((events) => {
        const locationEvents = (seletedLocation === 'all') ?
        events :
        events.filter((event) => event.location === seletedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          eventCount: inputNumber
        });
      })
    }
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return {city, number};
    })
    return data;
  };

  

  render() {
    const { events, locations, eventCount, showWelcomeScreen } = this.state;
    
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <div className="filter-box">
          {!navigator.onLine &&
          <OfflineAlert text="You are currently offline and the list of events may not be up to date"/>
          }
          <CitySearch
            locations={locations}
            updateEvents= {this.updateEvents}
          />
          <NumberOfEvents
            eventCount={eventCount}
            updateEvents={this.updateEvents}
          />
        </div>
        <EventList events={events} />
        <WelcomeScreen showWelcomeScreen={showWelcomeScreen} 
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;