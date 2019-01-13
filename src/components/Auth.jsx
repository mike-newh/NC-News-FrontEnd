import React, { Component } from 'react';
import Axios from 'axios';
import './Auth.css'

class Auth extends Component {
    state = {
        noInput: false,
        userid: '',
        badCreds: false
    }
    render() {
        const { noInput, badCreds } = this.state
        return (
            this.props.user && this.props.user.username ?
                this.props.children :
                <div id='AuthWrap'>
                    <form id='AuthForm'>
                        <label htmlFor='userid'>Username</label>
                        <input onChange={this.handleChange} id='userid'></input>
                        <button onClick={this.verifyUser}>Login</button>
                        <p>(Suggested login 'jessjelly')</p>
                        {noInput && <p>Please input a username</p>}
                        {badCreds && <p>Invalid username</p>}
                    </form>
                </div>
        );
    }
    verifyUser = (e) => {
        e.preventDefault()
        const { userid } = this.state
        if (userid.length < 1) { this.setState({ noInput: true, badCreds: false }) }
        else Axios.get(`https://southcoders-news.herokuapp.com/api/users/${userid}`).then(({ data }) => { this.props.login(data) }).then(() => { this.setState({ userid: '', badCreds: false, noInput: false }) }).catch((err) => { this.setState({ badCreds: true, noInput: false }) })
    }
    handleChange = (e) => {
        this.setState({ userid: e.target.value })
    }
}

export default Auth;