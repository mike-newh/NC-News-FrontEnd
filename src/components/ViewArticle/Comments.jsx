import React, { Component, Fragment } from 'react';
import './Comments.css'
import Axios from 'axios';
import Votes from '../Votes';

class Comments extends Component {
    state = {
        comments: []
    }
    render() {
        return (
            <div id='commentContainer'>
            <ul id='Comments'>
                {this.state.comments.map((comment)=>{
                    return (<Fragment key={comment.comment_id+'frag'}><li key={comment.comment_id}>{comment.body}</li><Votes key={`votes${comment.comment_id}`} articleId={this.props.articleId} commentId={comment.comment_id} votes={comment.votes}/></Fragment>)
                })}
            </ul>
            <button onClick={this.props.openAddComment} id='addComment'>Add Comment</button>
            </div>
        );
    }

    componentDidMount(){
        this.getComments()
    }
    componentDidUpdate(){
        console.log(this.state)
    }

    getComments = () => {
        Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments`).then(({data})=>{this.setState({comments: data.comments})})
    }
}

export default Comments;