import React from 'react';
import { Link } from '@reach/router'


const Footer = () => {
    return (
        <div className='Footer'>
            <Link to='/users'><p>Users</p></Link>
        </div>
    );
};

export default Footer;