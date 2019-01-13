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



class App extends Component {
  state = {
    user : {}
  }
  render() {
    return (
      <div id='Home'>
      <Auth login={this.login} user={this.state.user}>
      <Header user={this.state.user} handleLogOut={this.handleLogOut} />
      <Router className='Router'>
      <Articles path='/'/>
      <Articles path='/topics/:topic'/>
      <ViewArticle user={this.state.user} path='/articles/:articleId'/>
      <NewArticle user={this.state.user} path='/articles/post'/>
      <Users path='/users'/>
      <SingleUser path='/users/:username' />
      <FourOhFour default to='/404'/>
      </Router>
      </Auth>
      </div>
    );
  }
  // && !this.state.user && !this.state.user.username
  componentDidMount(){
    if (localStorage.getItem('user')){this.setState({user: JSON.parse(localStorage.getItem('user'))})}
  }
  handleLogOut = () => {
    console.log('logging out');
    this.setState({user: {}}, ()=>{
      localStorage.removeItem('user');
    })

  }

  login = ({user}) => {
    console.log('logging in', user)
    this.setState({user})
    localStorage.setItem('user', JSON.stringify(user))
  }
}
export default App;
