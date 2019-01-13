import React, { Component } from 'react';
import { Link } from '@reach/router';
import './TopicScroll.css';

function TopicScroll (props) {

        return (
            <ul id='TopicScroll'>
                {(props.topics) && props.topics.map((topic)=>{return (<Link key={`link${topic.slug}`} to={`/topics/${topic.slug}`}><li key={topic.slug}>{topic.slug}</li></Link>)})}
</ul>
        );  
}
export default TopicScroll;