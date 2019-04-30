import React, { Component } from 'react';
import Home from './home';
import Login from './login.js';
import Scrape from './external-show-listings/scrape';
import SpotifyPlayer from './SpotifyPlayer';
import Registration from './registration_form.js';
import EventCreation from './event_form';


// App class
class App extends Component {
  render() {
    return (
      <div>
        <Home />
        {/* <Login /> */}
        <Scrape />
        {/* this.state.artistid */}
        <SpotifyPlayer artistid="0Z8fvErw8r7KKFjYAWDd0a"/>
      <br />
        <Registration />
        <Login />
        <EventCreation />

      </div>
    );
  }
}
export default App;
