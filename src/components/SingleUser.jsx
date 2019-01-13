import React, {Component} from 'react';
import './SingleUser.css'
import Axios from 'axios';
import Loading from '../Loading';
import FourOhFour from '../FourOhFour';


class SingleUser extends Component {
    state = {
        user: {},
        badUser: false
    }
    render() {
     

    return (
        this.state.badUser ? <FourOhFour/> :
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
        Axios.get(`https://southcoders-news.herokuapp.com/api/users/${username}`).then(({data})=>{this.setState({user: data.user, badUser: false})}).catch((err)=>{this.setState({badUser: true})})
    }
};

export default SingleUser;