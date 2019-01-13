import React, { Component } from 'react';
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
        const { badUser, user } = this.state
        return (
            badUser ? <FourOhFour /> :
                user.username ?
                    <div id='SingleUser'>
                        <div id='userTitles'>
                            <span>Username </span>
                            <span>Name </span>
                            <span>User Id </span>
                        </div>
                        <div id='userData'>
                            <span>{user.username}</span>
                            <span>{user.name}</span>
                            <span>{user.user_id}</span>
                        </div>
                        <img id='userAvatar' alt='user avatar' src={user.avatar_url} />
                    </div> : <Loading />
        );
    }
    componentDidMount() {
        this.getAUser()
    }
    getAUser = () => {
        const { username } = this.props
        Axios.get(`https://southcoders-news.herokuapp.com/api/users/${username}`).then(({ data }) => { this.setState({ user: data.user, badUser: false }) }).catch((err) => { this.setState({ badUser: true }) })
    }
};

export default SingleUser;