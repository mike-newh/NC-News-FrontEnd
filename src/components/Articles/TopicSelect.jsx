import React from 'react';
import { Link } from '@reach/router'
import './TopicSelect.css';


const TopicSelect = (props) => {
    const { topics, handleAddButton } = props
    return (
        <div id='TopicSelect'>
            <h2>Topics</h2>
            <button id='addTopicBtn' onClick={handleAddButton}>Add a category</button>
            <ul>
                {(topics) && topics.map((topic) => { return (<Link className='link' key={`link${topic.slug}`} to={`/topics/${topic.slug}`}>{topic.slug}</Link>) })}
            </ul>
        </div>
    );
};

export default TopicSelect;