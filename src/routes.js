import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Welcome from './Welcome.js';
import Home from './Home.js';


const Routes = () => (
<BrowserRouter >
    <Switch>
    <Route exact path="/" component={Welcome}/>
    <Route path="/home" component={Home}/>
   </Switch>
</BrowserRouter>
);
export default Routes;