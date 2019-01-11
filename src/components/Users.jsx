import React, { Component } from 'react';
import Axios from 'axios';
import './Users.css'

class Users extends Component {
    state = {
        users: []
    }
    render() {
        return (
            <div id='MemberList'>
                {this.state.users.map((member)=>{return (<li key={member.user_id}>
                    <span id='usernametitle' className='userDataTitle'>Username </span>                
                    <span id='idtitle' className='userDataTitle'>Id </span>
                    <span id='username' className='userData'> {member.username}</span>
                    <span id='id' className='userData'> {member.user_id}</span></li>)})}
            </div>
        );
    }
    componentDidMount(){
        Axios.get('https://southcoders-news.herokuapp.com/api/users').then(({data})=>{this.setState({users: data.users})})
    }
}

export default Users;