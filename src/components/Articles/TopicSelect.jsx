import React from 'react';
import { Link } from '@reach/router'
import '../Grid.css';
import './TopicSelect.css';


const TopicSelect = (props) => {
    return (
        <div className='TopicSelect'>
        <ul>
        {(props.topics) && props.topics.map((topic)=>{return (<Link key={`link${topic.slug}`} to={`/topics/${topic.slug}`}><li key={topic.slug}>{topic.slug}</li></Link>)})}
        </ul>
        <button onClick={props.handleAddButton}>Add a category</button></div>
    );
};

export default TopicSelect;