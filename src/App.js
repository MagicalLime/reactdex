import './App.css';
import React, { Component } from 'react'; 
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layouts/Navbar.js';
import Dashboard from './components/layouts/Dashboard';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Pokemon from './components/pokemon/Pokemon';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
