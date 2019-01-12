import React, {Component} from 'react';
import './SingleUser.css'
import Axios from 'axios';
import Loading from '../Loading';


class SingleUser extends Component {
    state = {
        user: {}
    }
    render() {
     

    return (
        
        this.state.user.username ?
        <div id='SingleUser'>
        <div id='userTitles'>
        <span>Username </span>
        <span>Name </span>
        <span>User Id </span>
        </div>
        <div id='userData'>
        <span>{this.state.user.username}</span>
        <span>{this.state.user.name}</span>
        <span>{this.state.user.user_id}</span>
        </div>
        <img id='userAvatar' alt='user avatar' src={this.state.user.avatar_url}/>
        </div>: <Loading/>
    );}
    componentDidMount(){
        this.getAUser()
    }
    getAUser = () => {
        const {username} = this.props
        Axios.get(`https://southcoders-news.herokuapp.com/api/users/${username}`).then(({data})=>{this.setState({user: data.user})}).then(()=>{console.log(this.state)})
    }
};

export default SingleUser;