import React, { Component, Fragment } from 'react';
import './Comments.css'
import Axios from 'axios';
import Votes from '../Votes';

class Comments extends Component {
    state = {
        comments: [],
        toBeDeleted: NaN
    }
    render() {
        const { user } = this.props
        console.log(user)
        console.log(this.state.comments[0])
        return (
            <div id='commentContainer'>
                <ul id='Comments'>
                    {this.state.comments.map((comment) => {
                        return (<Fragment key={comment.comment_id + 'frag'}>{comment.comment_id === this.state.toBeDeleted ? <button onClick={()=>{this.confirmDel(comment.comment_id)}}>Confirm</button> : <li className='commentEntry' key={comment.comment_id}>{comment.body}</li>}<Votes key={`votes${comment.comment_id}`} articleId={this.props.articleId} commentId={comment.comment_id} votes={comment.votes} />{user.username === comment.author && <button onClick={()=>{this.handleClick(comment.comment_id)}}>Bin</button>}</Fragment>)
                    })}
                </ul>
                <button onClick={this.props.openAddComment} id='addComment'>Add Comment</button>
            </div>
        );
    }

    componentDidMount() {
        this.getComments()
    }
    componentDidUpdate() {
        console.log(this.state)
    }

    getComments = () => {
        Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments`).then(({ data }) => { this.setState({ comments: data.comments }) })
    }
    handleClick = (id) => {
        this.setState({toBeDeleted: id})
    }

    confirmDel = (id) => {
        console.log(`comment id ${id}`)
        const oldComments = [...this.state.comments]
        Axios.delete(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${id}`).catch(()=>{this.setState({comments: oldComments, toBeDeleted: NaN})})
        this.setState({comments: this.state.comments.filter((item)=>{return item.comment_id !== this.state.toBeDeleted})})
    }
}

export default Comments;