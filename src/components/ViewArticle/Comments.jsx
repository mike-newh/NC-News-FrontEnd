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
        beenDeleted: 0
    }
    render() {
        const { user } = this.props
    
        return (
            <div id='commentContainer'>
                <ul id='Comments'>
                    {this.state.comments.map((comment) => {
                        return (<Fragment key={comment.comment_id + 'frag'}> 
                        <div className='MasterComment'>
                        <div className='textAndVote'>
                        <li className='commentEntry' key={comment.comment_id}>{comment.body}</li>
                        
                        <Votes key={`votes${comment.comment_id}`} articleId={this.props.articleId} commentId={comment.comment_id} votes={comment.votes}/>
                        </div>
                        <div className='btnAndInfo'>
                        
                        <span>By {comment.author}</span><span>{comment.created_at.slice(0,10)}</span>
                        {user.username === comment.author ? comment.comment_id === this.state.toBeDeleted ? <button onClick={()=>{this.confirmDel(comment.comment_id)}}><i style={{color: 'green'}} className="fas fa-check"></i></button> : <button onClick={()=>{this.handleClick(comment.comment_id)}}><i className="far fa-trash-alt"></i></button>: <></>}</div>
                        </div></Fragment>)
                    })}
                    {this.props.commentCount > this.state.comments.length + this.state.beenDeleted && <li  id='loadMore'><button onClick={this.getMoreComments}>More Comments  <i className="far fa-comments"></i></button></li>}
                </ul>

                <CommentQuery handleQuery={this.handleQuery}/>
                <button onClick={this.props.openAddComment} id='addComment'>Add Comment</button>
            </div>
        );
    }

    componentDidMount() {
        this.getComments()
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.postingComment !== this.props.postingComment)
            {
            this.getComments()    
//could make a fake optimistic comment instead
// could iterate a posting count forward every time an article is posted
        }
    }



    getComments = () => {
        Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${this.state.queryString}`).then(({ data }) => { this.setState({ comments: data.comments, page: 1})})
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
    }

    confirmDel = (id) => {
        this.setState({beenDeleted: this.state.beenDeleted+1})
        const oldComments = [...this.state.comments]
        Axios.delete(`https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${id}`).catch(()=>{this.setState({comments: oldComments, toBeDeleted: NaN})})
        this.setState({comments: this.state.comments.filter((item)=>{return item.comment_id !== this.state.toBeDeleted})})
    }
}

export default Comments;