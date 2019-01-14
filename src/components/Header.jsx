import React from 'react';
import '../App.css';
import './Header.css';
import { Link } from '@reach/router'



const Header = (props) => {
    const {handleLogOut, user} = props;
    return (
        <div id='Header'>
            <Link className='link' to='/'>All Articles</Link>
            <Link className='link' to='/articles/post'><span>Add Article</span></Link>
            <Link className='link' to='/users'><p>Users</p></Link>
            <div id='userBox'>
            <div id='userDetail'>
            <p id='loggedInAs'>Logged in as:</p><p>{user.username}</p></div><img alt='user Avatar' id='avatar' src={user.avatar_url}></img>
            </div>
            <Link className='link' to='/' onClick={handleLogOut}>Log Out</Link>
        </div>
    );
};

export default Header;