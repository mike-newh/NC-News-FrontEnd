import React, { Component } from 'react';
import './PostingComment.css'
import Axios from 'axios';

class PostingComment extends Component {
    state = {
        body: '',
        error: false,
        posted: false,
    }
    render() {
        return (
            <div id='PostingComment'>
                <button onClick={this.props.closeNewComment} id='closeBox'>x</button>
                <form onSubmit={this.handleSubmit} id='commentForm'>
                    <label htmlFor='commentText'>Write a comment</label>
                    <div id='commentSubmitWrap'>
                    <textarea onChange={this.handleChange} cols='80' rows='4' type='text' id='commentText'></textarea> <button>Submit</button></div>
                    <span>Posting as {this.props.user.username} on {this.props.article.title}</span>
                    {this.state.error && <p>Error</p>}
                    {this.state.posted && <p>Posted!</p>}
                </form>
                
            </div>
        );
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (!this.state.body){this.setState({error: true, posted: false})}
        else {
            const comment = {body: this.state.body, user_id: this.props.user.user_id}
            Axios.post(`https://southcoders-news.herokuapp.com/api/articles/${this.props.article.article_id}/comments`, comment)
            .then((res)=>{console.log('good post');
            this.setState({error: false, posted: true})})
            .catch(()=>{this.setState({error: true, posted: false})})
        }
    }
    handleChange = (e) => {
        this.setState({body: e.target.value})
    }
}

export default PostingComment;