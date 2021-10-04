import './App.css';
import React, { Component } from 'react'; 
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/layouts/Navbar.js';



function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
