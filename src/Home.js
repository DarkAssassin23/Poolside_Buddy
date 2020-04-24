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

    render() {
        // if (!sessionStorage.getItem('userData') || this.state.redirect) {
        //     return (<Redirect to={'/'} />)
        // }
        let url = this.props.location.search;
        let params = queryString.parse(url)
        console.log(params)
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Poolside Buddy</h1>
                    <p>Hello {params.name}!</p>
                </header>
            </div>
        );
    }
}
export default Home;