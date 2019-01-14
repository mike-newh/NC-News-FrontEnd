import React, { Component } from 'react';
import './App.css';
import Articles from './components/Articles/Articles';
import Header from './components/Header';
import { Router } from '@reach/router'
import ViewArticle from './components/ViewArticle/ViewArticle';
import Auth from './components/Auth';
import NewArticle from './components/NewArticle/NewArticle';
import Users from './components/Users';
import SingleUser from './components/SingleUser';
import FourOhFour from './FourOhFour';
import Axios from 'axios'



class App extends Component {
  state = {
    user: {},
    topics: []
  }
  render() {
  
    const { user, topics } = this.state
    return (
      <div id='Home'>
        <Auth login={this.login} user={user}>
          <Header user={user} handleLogOut={this.handleLogOut} />
          <Router className='Router'>
            <Articles topics={topics} path='/' />
            <Articles topics={topics} path='/topics/:topic' />
            <ViewArticle user={user} path='/articles/:articleId' />
            <NewArticle topics={topics} user={user} path='/articles/post' />
            <Users path='/users' />
            <SingleUser path='/users/:username' />
            <FourOhFour default to='/404' />
          </Router>
        </Auth>
      </div>
    );
  }
  componentDidMount() {
    if (localStorage.getItem('user')) { this.setState({ user: JSON.parse(localStorage.getItem('user')) }) }
    this.getTopics()
  }
  handleLogOut = () => {
    this.setState({ user: {} }, () => {
      localStorage.removeItem('user');
    })
  }
  getTopics = () => {
    Axios.get(`https://southcoders-news.herokuapp.com/api/topics`).then(({ data }) => {
      this.setState({ topics: data.topics })
    })
  }
  login = ({ user }) => {
    this.setState({ user })
    localStorage.setItem('user', JSON.stringify(user))
  }
}
export default App;
