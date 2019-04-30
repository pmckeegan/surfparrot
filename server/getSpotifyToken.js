const request = require('request')
const base64url = require('base64url');


const getSpotifyToken = ({
    clientId,
    clientSecret
  }, done) =>
  request({
      method: 'POST',
      uri: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'client_credentials',
      },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + base64url(clientId + ':' + clientSecret),
      },
      json: true,
    },

    (error, response, body) => {
      console.log("body.access_token~~~~~~~~", body.access_token)
      if (error) {
        done(error)
      } else if (response.statusCode < 200 || response.statusCode > 299) {
        done(new Error('Error ' + response.statusCode + ' from Spotify API'))
      } else if (body && body.error) {
        done(
          new Error(
            body.error + ' ' + body.error_description + ' from Spotify API'
          )
        )
      } else if (!body) {
        done(new Error('No token returned by Spotify API.'))
      } else {
        done(null, body.access_token)
      }
    }
  )

// function encodeInBase64(s) {
//   if (typeof window === 'object' && window.btoa) {
//     return window.btoa(s)
//   } else {
//     return new Buffer(s).toString('base64')
//   }
// }

module.exports = getSpotifyToken


