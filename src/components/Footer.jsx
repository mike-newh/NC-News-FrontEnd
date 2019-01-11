import React from 'react';
import './Footer.css'


const Footer = (props) => {
    return (
        <div id='Footer'>
            <p>Logged in as {props.user.username}</p>
        </div>
    );
};

export default Footer;