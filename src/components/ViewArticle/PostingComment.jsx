import React, { Component } from 'react';
import './PostingComment.css'

class PostingComment extends Component {
    render() {
        return (
            <div id='PostingComment'>
                <button onClick={this.props.closeNewComment} id='closeBox'>x</button>
                <form id='commentForm'>
                    <label htmlFor='commentText'>Write a comment</label>
                    <div id='commentSubmitWrap'>
                    <textarea cols='80' rows='4' type='text' id='commentText'></textarea> <button>Submit</button></div>
                    <span>Posting as {this.props.user.username} on {this.props.article.title}</span>
                </form>
                
            </div>
        );
    }
    
}

export default PostingComment;