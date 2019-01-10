import React, { Component } from 'react';
import './App.css';
import './components/Grid.css';
import Articles from './components/Articles/Articles';
import Header from './components/Header';
import Footer from './components/Footer';
import { Router } from '@reach/router'
import ViewArticle from './components/ViewArticle/ViewArticle';
import Auth from './components/Auth';
import NewArticle from './components/NewArticle/NewArticle';
import Users from './components/Users';



class App extends Component {
  state = {
    user : {}
  }
  render() {
    return (
      <div className='home'>
      <Auth login={this.login} user={this.state.user}>
      <Header user={this.state.user} />
      <Router className='Router'>
      <Articles path='/'/>
      <Articles path='/topics/:topic'/>
      <ViewArticle user={this.state.user} path='/articles/:articleId'/>
      <NewArticle user={this.state.user} path='/articles/post'/>
      <Users path='/users'/>
      </Router>
      <Footer />
      </Auth>
      </div>
    );
  }
  componentDidMount(){
    if (localStorage.getItem('user') && !this.state.user.username){this.setState({user: JSON.parse(localStorage.getItem('user'))})}
  }
  login = ({user}) => {
    console.log('logging in', user)
    this.setState({user})
    localStorage.setItem('user', JSON.stringify(user))
  }
}
export default App;
