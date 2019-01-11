import React from 'react';
import { Link } from '@reach/router'
import './TopicSelect.css';


const TopicSelect = (props) => {
    return (
        <div id='TopicSelect'>
        <h2>Topics</h2>
        <button onClick={props.handleAddButton}>Add a category</button>
        <ul>
        {(props.topics) && props.topics.map((topic)=>{return (<Link className='link' key={`link${topic.slug}`} to={`/topics/${topic.slug}`}>{topic.slug}</Link>)})}
        </ul>
        </div>
    );
};

export default TopicSelect;