import React, { Component } from 'react';
import { Link } from '@reach/router'
import './TopicScroll.css';

class TopicScroll extends Component {
    render() {
        return (
            <ul id='TopicScroll'>
                {(this.props.topics) && this.props.topics.map((topic)=>{return (<Link key={`link${topic.slug}`} to={`/topics/${topic.slug}`}><li key={topic.slug}>{topic.slug}</li></Link>)})}
</ul>
        );
    }
}

export default TopicScroll;

