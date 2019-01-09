import React, { Component } from 'react';
import '../Grid.css';
import ArticleText from './ArticleText';
import Comments from './Comments';
import Axios from 'axios'
import PostingComment from './PostingComment';

class ViewArticle extends Component {
    state = {
        articleId : undefined,
        article: undefined,
        postingComment: false,
    }
    render() {
        return (
            <div className='ViewArticle'>
            <ArticleText user={this.props.user} article={this.state.article}/>
            {this.state.article && <Comments user={this.props.user} openAddComment={this.openAddComment} articleId={this.state.articleId}/>}
            {this.state.postingComment && <PostingComment handleCommentPosted={this.handleCommentPosted} article={this.state.article} user={this.props.user}  closeNewComment={this.closeNewComment}/>}
            </div>
        );
    }

    setArticleId = () => {
        this.setState({articleId: this.props.articleId})
    }

    componentDidMount(){
        this.setArticleId()
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.articleId !== this.state.articleId){
            this.getArticleInfo()
        }
    }
    getArticleInfo = () => {
        console.log('GET REQUEST SENT Article Info')
        Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.state.articleId}`).then(({data})=>{
            this.setState({article: data.article})
        }).catch(()=>{this.setState({article: null})})
    }
    closeNewComment = () => {
        this.setState({postingComment: false})
    }
    openAddComment = () => {
        this.setState({postingComment: true})
    }
    handleCommentPosted = () => {
        setTimeout(()=>{
            this.setState({postingComment: false})
        }, 3000)
    }
}

export default ViewArticle;