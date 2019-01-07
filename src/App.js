import React, { Component, Fragment } from 'react';
import './App.css';
import './Grid.css';
import Articles from './components/Articles';
import Header from './components/Header';
import Footer from './components/Footer';


class App extends Component {
  render() {
    return (
      <div className='home'>
      <Header />
      <Articles />
      <Footer />
      </div>
    );
  }
}
export default App;
