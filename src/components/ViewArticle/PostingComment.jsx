import React, { Component } from 'react';
import './PostingComment.css'

class PostingComment extends Component {
    render() {
        return (
            <div id='PostingComment'>
                <button onClick={this.props.closeNewComment}>x</button>
            </div>
        );
    }
    
}

export default PostingComment;