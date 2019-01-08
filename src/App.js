import React, { Component } from 'react';
import './App.css';
import './Grid.css';
import Articles from './components/Articles';
import Header from './components/Header';
import Footer from './components/Footer';
import { Router } from '@reach/router'



class App extends Component {
  render() {
    return (
      <div className='home'>
      <Header />
      <Router>
      <Articles path='/'/>
      <Articles path='/topics/:topic'/>

      </Router>
      <Footer />
      </div>
    );
  }
}
export default App;
