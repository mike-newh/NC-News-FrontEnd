import React from 'react';
import '../App.css';
import { Link } from '@reach/router'



const Header = (props) => {
    return (
        <div className='Header'>
            <Link to='/'>Home</Link>
            <p>Logged in as {props.user.username}</p>
        </div>
    );
};

export default Header;