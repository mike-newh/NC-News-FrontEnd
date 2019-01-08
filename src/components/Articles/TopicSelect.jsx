import React from 'react';
import { Link } from '@reach/router'
import '../Grid.css';
import './TopicSelect.css';


const TopicSelect = (props) => {
    return (
        <ul className='TopicSelect'>
        {(props.topics) && props.topics.map((topic)=>{return (<Link key={`link${topic.slug}`} to={`/topics/${topic.slug}`}><li key={topic.slug}>{topic.slug}</li></Link>)})}
        </ul>
    );
};

export default TopicSelect;