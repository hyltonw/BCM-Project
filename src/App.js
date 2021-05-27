import logo from './logo.svg';
import { Switch, useParams } from 'react-router-dom'
import './App.css';
import SingleLocation from './SingleLocation/SingleLocation'
import getAllLocations from './Service/fileService'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {LandingPage} from "./LandingPage/LandingPage"
import { SubmitPage } from './SubmitPage/SubmitPage';

function App() {

  return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/user/:url" exact>
              <LandingPage/>
            </Route>
            <Route path="/submitted">
              <SubmitPage/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}


export default App;
