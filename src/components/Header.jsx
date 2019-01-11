import React from 'react';
import '../App.css';
import './Header.css';
import { Link } from '@reach/router'



const Header = (props) => {
    return (
        <div id='Header'>
            <Link className='link' to='/'>All Articles</Link>
            <Link className='link' to='/articles/post'><span>Add Article</span></Link>
            <Link className='link' to='/users'><p>Users</p></Link>
        </div>
    );
};

export default Header;