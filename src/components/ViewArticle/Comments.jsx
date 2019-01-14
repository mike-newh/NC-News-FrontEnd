import React, { Component, Fragment } from 'react';
import './Comments.css'
import Axios from 'axios';
import Votes from '../Votes';
import CommentQuery from './CommentQuery';

class Comments extends Component {
    state = {
        comments: [],
        toBeDeleted: NaN,
        queryString: '?sort_by=votes&sort_ascending=false',
        page: 1,
        beenDeleted: 0,
        addedComments: this.props.newComments
    }
    render() {
        const { user, articleId, commentCount, openAddComment } = this.props
        const { addedComments, comments, beenDeleted, toBeDeleted } = this.state
        const allComments = addedComments.concat(comments)
        return (
            <div id='commentContainer'>
                            <CommentQuery className='nonMobile' handleQuery={this.handleQuery} />
                <button className='nonMobile' onClick={openAddComment} id='addComment'>Add Comment</button>
            
                <ul id='Comments'>
               
                    {allComments.map((comment) => {
                        return (<Fragment key={comment.comment_id + 'frag'}>
                            <div className='MasterComment'>
                                <div className='textAndVote'>
                                    <li className='commentEntry' key={comment.comment_id}>{comment.body}</li>

                                    <Votes key={`votes${comment.comment_id}`} articleId={articleId} commentId={comment.comment_id} votes={comment.votes} />
                                </div>
                                <div className='btnAndInfo'>

                                    <span>By {comment.author ? comment.author : user.username}</span><span>{comment.created_at.slice(0, 10)}</span>
                                    {(user.username === comment.author) && comment.comment_id !== 'newComment' ? comment.comment_id === toBeDeleted ? <button onClick={() => { this.confirmDel(comment.comment_id) }}><span>Confirm</span></button> : <button onClick={() => { this.handleClick(comment.comment_id) }}><i className="far fa-trash-alt"></i></button> : <></>}</div>
                            </div></Fragment>)
                    })}
                    {comments && commentCount > comments.length + beenDeleted && <li id='loadMore'><button onClick={this.getMoreComments}>More Comments  <i className="far fa-comments"></i></button></li>}
                </ul>


            </div>
        );
    }

    componentDidMount() {

        this.getComments()

    }
    componentDidUpdate(prevProps) {
        if (prevProps.newComments !== this.props.newComments && this.props.newComments.length > 0) {
            this.setState({ addedComments: this.props.newComments })
        }
    }



    getComments = () => {
        Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${this.state.queryString}`).then(({ data }) => { this.setState({ comments: data.comments, page: 1 }) }).catch(() => { })
    }
    getMoreComments = () => {
        this.setState({ page: this.state.page + 1 }, () => {
            Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${this.state.queryString}&p=${this.state.page}`).then(({ data }) => {
                this.setState({ comments: this.state.comments.concat(data.comments) })
            })
            //newComment comments will also apper alongside their real counterparts
        })

    }

    handleClick = (id) => {
        this.setState({ toBeDeleted: id })
    }
    handleQuery = (e) => {
        this.setState({ queryString: e.target.value, page: 1 }, () => {
            this.getComments()
        })
    }

    confirmDel = (id) => {
        this.setState({ beenDeleted: this.state.beenDeleted + 1 })
        const oldComments = [...this.state.comments]
        Axios.delete(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${id}`).catch(() => { this.setState({ comments: oldComments, toBeDeleted: NaN }) })
        this.setState({ comments: this.state.comments.filter((item) => { return item.comment_id !== this.state.toBeDeleted }) })
    }
}

export default Comments;