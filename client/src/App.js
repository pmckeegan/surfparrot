import React, { Component } from 'react';
import Home from './home';
import Login from './login';
import Register from './register';
import Contact from './contact';
import Scrape from './external-show-listings/scrape';
import SpotifyPlayer from './SpotifyPlayer';
import axios from 'axios';
const request = require('request');

// import { threadId } from 'worker_threads';

// App class
class App extends Component {
  state = {
    token: null,
  }

  componentDidMount() {
    this.getSpotifyToken()
  }


  render() {
    return (
      
      <div>
        <Home />
        <Login />
        <Register />
        <Contact />
        <Scrape />
        {/* this.state.artistid */}
        <SpotifyPlayer artistid="0Z8fvErw8r7KKFjYAWDd0a"/>
        <button onClick={() => this.getArtist('esther')}>get artist</button>
      </div>
    );
  }

  getArtist = async artistName => {
    try {
      if (this.state.token) {
      console.log("this.state.token: ", `${this.state.token}`)
      const response = await axios.get(
        `https://api.spotify.com/v1/search/?q=name:${artistName}&type=artist`,
        {
          headers: { Authorization: `Bearer ${this.state.token}` },
        }  
      )
      .then(getArtist => {
        // console.log(getArtist)
        console.log(`this.${artistName}`) 
        const items = response.data.artists.items
        // get the first artist returned from the request
        const firstItem = items.find(({ id }) => !!id)
  
        if (!firstItem) {
          console.log('no artists found')
          return
        }
        const id = firstItem.id 
        // get the id of the first artist returned
        // do something with the atist id
        // https://api.spotify.com/v1/artists/{id}/top-tracks
      })    
    } else {
      this.getSpotifyToken()
      // console.log("getSpotifyToken: ", this.getSpotifyToken())
      // this.getRefreshToken()
      // console.log("getRefreshToken: ", this.getRefreshToken())
   
    }
      
      // .catch(err => {
      //    // queries the spotify_token endpoint on backend
      //   this.getSpotifyToken()
      //   console.log("getSpotifyToken: ", this.getSpotifyToken())
      //   this.getRefreshToken()
      //   console.log("getRefreshToken: ", this.getRefreshToken())
      // });

    
    } catch (e) {
      // queries the spotify_token endpoint on backend
      this.getSpotifyToken()
      this.getRefreshToken()
    }
  }

  // helper function sends spotify_token endpoint back to the frontend
  getSpotifyToken = () => {
    axios.get('http://localhost:5000/spotify_token')
    .then(function (response) {
      const token = response.data.token
      debugger
      console.log("token: ", token)
      this.setState({ token })
      console.log(response);
    })
    // try {
      // axios.get('/spotify_token').then(function (response) { 
      //   debugger
      //   // handle success
      //   const token = response.data.token
      //   console.log("token: ", token)
      //   this.setState({ token })
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   debugger
      //   // handle error
      //   console.log(error);
      // })
    // } catch (error) {
    //   console.log(error)
    // }
  }

    // helper function sends refresh_token endpoint back to the frontend
    getRefreshToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/refresh_token')
        const token = response.data.token
        this.setState({ token })
      } catch (error) {
        console.log(error)
      }
    }
  

}
export default App;
