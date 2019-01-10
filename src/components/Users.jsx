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
                {this.state.users.map((member)=>{return (<li><span>User: {member.username}</span><span>Id: {member.user_id}</span></li>)})}
            </div>
        );
    }
    componentDidMount(){
        Axios.get('https://southcoders-news.herokuapp.com/api/users').then(({data})=>{this.setState({users: data.users})})
    }
}

export default Users;