import React, { Component } from 'react';
import Axios from 'axios';

class Auth extends Component {
    state = {
        userid: ''
    }
    render() {
        return (
            this.props.user.username ?
            this.props.children :
            <form>
                <label htmlFor='userid'>Username</label>
                <input onChange={this.handleChange} id='userid'></input>
                <button onClick={this.verifyUser}>Login</button>
            </form>
        );
    }
    verifyUser = (e) => {
        e.preventDefault()
        console.log('GET REQUEST LOGIN')
        Axios.get(`https://southcoders-news.herokuapp.com/api/users/${this.state.userid}`).then(({data})=>{this.props.login(data)})
    }
    handleChange = (e) => {
        this.setState({userid: e.target.value})
    }
}

export default Auth;