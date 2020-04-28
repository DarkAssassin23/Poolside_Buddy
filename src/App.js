import React, { Component } from 'react';
import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import publicIP from 'react-native-public-ip'
import './App.css';
import { config } from './firebaseAuth';

firebase.initializeApp(config);

class App extends Component {

  state = { 
    isSignedIn: false 
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    })
    publicIP()
      .then(ip => {
        //console.log(ip)
        fetch(`http://ip-api.com/json/${ip}`)
          .then(res => res.json())
          .then((result) => {
            //console.log(result);
            fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + result.lat + "&lon=" + result.lon + "&appid=09cc85f823c17b23cdea7d3520183389")
              .then(res => res.json())
              .then((data) => {
                this.setState({
                  weather: data,
                  temp: data.main.temp,
                  name: data.name,
                  conditions: data.weather[0].description
                })
              })
              .catch(console.log)
            this.setState({
              lat: result.lat,
              lon: result.lon
            })
          }).catch(console.log)

      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {

    function kelvinToFahrenheit(temp) {
      var frac = 9 / 5;
      var final = frac * (temp - 273) + 32;
      return Math.round(final);
    }

    function poolDay(temp, weatherConditions) {
      if(temp==null){
        return "Unable to gather weather data"
      }
      else if (temp < 70) {
        return "Today is not a good day to go to the pool because it is too cold";
      }
      else if (temp > 70 && (weatherConditions.includes("rain") || weatherConditions.includes("drizzle") || weatherConditions.includes("thunderstorm"))) {
        return "Today is not a good day to go to the pool because of inclimate weather";
      }
      else {
        return "Today is a good day to go to the pool"
      }
    }


    let weatherDataTemp = kelvinToFahrenheit(this.state.temp);
    let locationName = this.state.name;
    let conditions = this.state.conditions;
    let poolDayResponse = poolDay(weatherDataTemp, conditions);

    return (
      <div className="App">
        <header className="App-header">
          {this.state.isSignedIn ?
            <div>
              <h1>Poolside Buddy</h1>
              <h3>Hello {firebase.auth().currentUser.displayName}!</h3>
              <p>
                It is currently {weatherDataTemp}ºF in {locationName} with {conditions}
                <br></br>
                <span>{poolDayResponse}</span>
              </p>
              <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
            </div>
            :
            <div>
              <h1>Poolside Buddy</h1>
              <p>Sign in</p>
              <StyleFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          }
        </header>
      </div>
    );
  }
}
export default App;