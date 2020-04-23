import React, { Component } from 'react';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { PostData } from './PostData.js';
import { Redirect } from 'react-router-dom';
import './App.css';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: false,
            redirect: false
        };
        this.signup = this.signup.bind(this);
    }

    signup(res, type) {
        let postData;
        if (type === 'facebook' && res.email) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
            };
        }

        if (type === 'google' && res.w3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };
        }

        if (postData) {
            PostData('signup', postData).then((result) => {
                let responseJson = result;
                sessionStorage.setItem("userData", JSON.stringify(responseJson));
                this.setState({ redirect: true });
            });
        } else { }
    }

    render() {

        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'} />)
        }

        const responseFacebook = (response) => {
            console.log("facebook console");
            console.log(response);
            this.signup(response, 'facebook');
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response, 'google');
        }

        return (
            <div className="App">

                <header className="App-header">
                    <h1>Poolside Buddy</h1>
                    <p>Sign in</p>

                    <FacebookLogin
                        appId="579664726242177"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook} />
                    <p></p>

                    <GoogleLogin
                        clientId="418283014621-7boa88m2tvstf5jiastufnu0uq4ipcer.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle} />
                </header>
            </div>
        );
    }
}
export default Welcome;