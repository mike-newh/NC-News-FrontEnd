import React, { Component } from 'react';
import './App.css';
import './components/Grid.css';
import Articles from './components/Articles/Articles';
import Header from './components/Header';
import Footer from './components/Footer';
import { Router } from '@reach/router'
import ViewArticle from './components/ViewArticle/ViewArticle';



class App extends Component {
  render() {
    return (
      <div className='home'>
      <Header />
      <Router>
      <Articles path='/'/>
      <Articles path='/topics/:topic'/>
      <ViewArticle path='/articles/:articleId'/>
      </Router>
      <Footer />
      </div>
    );
  }
}
export default App;
