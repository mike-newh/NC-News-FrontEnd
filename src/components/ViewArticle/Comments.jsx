import React, { Component, Fragment } from 'react';
import './Comments.css'
import Axios from 'axios';
import Votes from '../Votes';
import CommentQuery from './CommentQuery';
import {throttle} from 'lodash'

class Comments extends Component {
    state = {
        comments: [],
        toBeDeleted: NaN,
        queryString: '?sort_by=votes&sort_ascending=false',
        page: 1
    }
    render() {
        const { user } = this.props
    
        return (
            <div id='commentContainer'>
                <ul id='Comments'>
                    {this.state.comments.map((comment) => {
                        return (<Fragment key={comment.comment_id + 'frag'}> <li className='commentEntry' key={comment.comment_id}>{comment.body+'created:'+comment.created_at.slice(0,10) }</li><Votes key={`votes${comment.comment_id}`} articleId={this.props.articleId} commentId={comment.comment_id} votes={comment.votes}/>
                        {user.username === comment.author ? comment.comment_id === this.state.toBeDeleted ? <button onClick={()=>{this.confirmDel(comment.comment_id)}}>Confirm</button> : <button onClick={()=>{this.handleClick(comment.comment_id)}}>Bin</button>: <></>}</Fragment>)
                    })}
                    {this.props.commentCount > this.state.comments.length && <li onClick={this.getMoreComments} id='loadMore'>LOAD MORE</li>}
                </ul>

                <CommentQuery handleQuery={this.handleQuery}/>
                <button onClick={this.props.openAddComment} id='addComment'>Add Comment</button>
            </div>
        );
    }

    componentDidMount() {
        this.getComments()
    }
    componentWillUnmount() {
    }

    componentDidUpdate() {
        console.log(this.props.commentCount)
    }

    getComments = () => {
        console.log('GET fired with ', this.state.queryString)
        Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${this.state.queryString}`).then(({ data }) => { this.setState({ comments: data.comments }) })
    }
    getMoreComments = () => {
        this.setState({page: this.state.page+1}, ()=>{
            Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${this.state.queryString}&p=${this.state.page}`).then(({data})=>{
                this.setState({comments: this.state.comments.concat(data.comments)})
            })
        })
        
    }
    handleClick = (id) => {
        this.setState({toBeDeleted: id})
    }
    handleQuery = (e) => {
        this.setState({queryString: e.target.value, page: 1}, ()=>{
            this.getComments()
        })
        console.log('change fired')
    }

    confirmDel = (id) => {
        console.log(`comment id ${id}`)
        const oldComments = [...this.state.comments]
        Axios.delete(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${id}`).catch(()=>{this.setState({comments: oldComments, toBeDeleted: NaN})})
        this.setState({comments: this.state.comments.filter((item)=>{return item.comment_id !== this.state.toBeDeleted})})
    }
}

export default Comments;