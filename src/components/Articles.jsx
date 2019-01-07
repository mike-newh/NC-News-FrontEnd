import React, { Component } from 'react';
import TopicSelect from './TopicSelect';
import '../App.css';
import '../Grid.css';

class Articles extends Component {
    render() {
        return (
            <div>
            <TopicSelect/>
            <div className='Articles'></div>
            </div>
        );
    }
}

export default Articles;