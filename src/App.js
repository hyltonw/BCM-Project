import logo from './logo.svg';
import { Switch, useParams } from 'react-router-dom'
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {LandingPage} from "./LandingPage/LandingPage"
import { SubmitPage } from './SubmitPage/SubmitPage';
import { AdminPage } from './AdminPage/AdminPage';


function App() {

  return (
      <Router>
        <div id="header">
          <img id ="logo"src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Baylor_College_of_Medicine_Logo.png"></img>
          <h1>Baylor College of Medicine</h1>
        </div>
        <div className="App">
          <Switch>
            <Route path="/user/:url" exact>
              <LandingPage/>
            </Route>
            <Route path="/submitted">
              <SubmitPage/>
            </Route>
            <Route path="/admin">
              <AdminPage/>
            </Route>
          </Switch>
        </div>
      </Router>
  );
}


export default App;
