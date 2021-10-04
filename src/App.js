import './App.css';
import React, { Component } from 'react'; 
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layouts/Navbar.js';
import Dashboard from './components/layouts/Dashboard';



function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Dashboard /> 
      </div>
    </div>
  );
}

export default App;
