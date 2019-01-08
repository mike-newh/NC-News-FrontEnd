import React from 'react';
import '../App.css';
import './Header.css';
import { Link } from '@reach/router'



const Header = (props) => {
    return (
        <div className='Header'>
            <Link to='/'>Home</Link>
            <p>Logged in as {props.user.username}</p>
            <Link to='/articles/post'><span>Add Article</span></Link>
        </div>
    );
};

export default Header;