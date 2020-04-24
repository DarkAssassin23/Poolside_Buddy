import React, { Component } from 'react';
import queryString from 'query-string';
import './App.css';
import { Redirect } from 'react-router-dom';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            redirect: false,
        };
    }

    // componentDidMount() {
    //     let data = JSON.parse(sessionStorage.getItem('userData'));
    //     console.log(data);
    //     this.setState({ name: data.userData.name })
    // }

    componentDidMount() {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=09cc85f823c17b23cdea7d3520183389')
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
    }

    render() {
        // if (!sessionStorage.getItem('userData') || this.state.redirect) {
        //     return (<Redirect to={'/'} />)
        // }
        function kelvinToFahrenheit(temp) {
            var frac = 9 / 5;
            var final = frac * (temp - 273) + 32;
            return Math.round(final);
        };

        function poolDay(temp, conditions) {
            if (temp < 70) {
                return "Today is not a good day to go to the pool because it is too cold";
            }
            else if (temp > 70 && (conditions.includes("rain") || conditions.includes("drizzle") || conditions.includes("thunderstorm"))) {
                return "Today is not a good day to go to the pool because of inclimate weather";
            }
            else {
                return "Today is a good day to go to the pool"
            }
        };

        let url = this.props.location.search;
        let params = queryString.parse(url)
        // api key: 09cc85f823c17b23cdea7d3520183389
        var weatherDataTemp = this.state.temp;
        weatherDataTemp = kelvinToFahrenheit(weatherDataTemp);
        let locationName = this.state.name;
        let conditions = this.state.conditions;
        let poolDayResponse = poolDay(weatherDataTemp, conditions);
        console.log(this.state.weather);
        console.log(conditions)
        console.log(kelvinToFahrenheit(weatherDataTemp));
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Poolside Buddy</h1>
                    <h3>Hello {params.name}!</h3>
                    <p>
                        It is currently {weatherDataTemp}ºF in {locationName} with {conditions}
                        <br></br>
                        <span>{poolDayResponse}</span>
                    </p>
                </header>
            </div>
        );
    }
}
export default Home;