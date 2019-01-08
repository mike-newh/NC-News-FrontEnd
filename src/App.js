import React, { Component } from 'react';
import './App.css';
import './components/Grid.css';
import Articles from './components/Articles/Articles';
import Header from './components/Header';
import Footer from './components/Footer';
import { Router } from '@reach/router'
import ViewArticle from './components/ViewArticle/ViewArticle';
import Auth from './components/Auth';



class App extends Component {
  state = {
    user : {}
  }
  render() {
    return (
      <div className='home'>
      <Auth login={this.login} user={this.state.user}>
      <Header user={this.state.user} />
      <Router>
      <Articles path='/'/>
      <Articles path='/topics/:topic'/>
      <ViewArticle path='/articles/:articleId'/>
      </Router>
      <Footer />
      </Auth>
      </div>
    );
  }
  login = ({user}) => {
    console.log('logging in', user)
    this.setState({user})
  }
}
export default App;
