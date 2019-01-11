import React, { Component } from 'react';
import Axios from 'axios';
import './Auth.css'

class Auth extends Component {
    state = {
        userid: ''
    }
    render() {
        return (
            this.props.user.username ?
            this.props.children :
            <div id='AuthWrap'>
            <form id='AuthForm'>
                <label htmlFor='userid'>User Id</label>
                <input onChange={this.handleChange} id='userid'></input>
                <button onClick={this.verifyUser}>Login</button>
                <p>(Takes User Id, suggested login '1')</p>
            </form>
            </div>
        );
    }
    verifyUser = (e) => {
        e.preventDefault()
        Axios.get(`https://southcoders-news.herokuapp.com/api/users/${this.state.userid}`).then(({data})=>{this.props.login(data)})
    }
    handleChange = (e) => {
        this.setState({userid: e.target.value})
    }
}

export default Auth;