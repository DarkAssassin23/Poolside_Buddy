import React, { Component } from 'react';
import firebase, { initializeApp } from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import './App.css';
import {config} from './firebaseAuth';

firebase.initializeApp(config);

class Welcome extends Component {

    state = { isSignedIn: false };
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess : () => false
        }
    }

    componentDidMount = () =>{
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn:!!user});
        })
    }

    render() {

        return (
            <div className="App">

                <header className="App-header">
                    {this.state.isSignedIn ?
                        <div>
                            <h1>Poolside Buddy</h1>
                            <h3>Hello {firebase.auth().currentUser.displayName}!</h3>
                            <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
                        </div>
                        :
                        <div>
                            <h1>Poolside Buddy</h1>
                            <p>Sign in</p> 
                            <StyleFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth = {firebase.auth()}
                            />
                        </div>
                    }

                </header>
            </div>
        );
    }
}
export default Welcome;