import logo from './logo.svg';
import { Switch, useParams } from 'react-router-dom'
import './App.css';
import SingleLocation from './SingleLocation/SingleLocation'
import getAllLocations from './Service/fileService'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {LandingPage} from "./LandingPage/LandingPage"

function App() {

  return (
      <Router>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        <div className="App">
          <Switch>
            <Route path="/user/:url" exact>
              <LandingPage/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}


export default App;
