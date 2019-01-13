import React, { Component } from 'react';
import './ViewArticle.css';
import ArticleText from './ArticleText';
import Comments from './Comments';
import Axios from 'axios'
import PostingComment from './PostingComment';
import moment from 'moment'

class ViewArticle extends Component {
    state = {
        articleId: undefined,
        article: undefined,
        postingComment: false,
        psuedos: []
    }
    render() {
        const { user } = this.props
        return (
            <div className='ViewArticle'>
                <ArticleText user={user} article={this.state.article} />
                {this.state.article && <Comments psuedos={this.state.psuedos.length > 0 ? this.state.psuedos : []} postingComment={this.state.postingComment} user={user} openAddComment={this.openAddComment} articleId={this.state.articleId} commentCount={this.state.article.comment_count} />}
                {this.state.postingComment && <PostingComment handleCommentPosted={this.handleCommentPosted} article={this.state.article} user={user} closeNewComment={this.closeNewComment} />}
            </div>
        );
    }

    setArticleId = () => {
        this.setState({ articleId: this.props.articleId })
    }
    componentDidMount() {
        this.setArticleId()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.articleId !== this.state.articleId) {
            this.getArticleInfo()
        }
    }
    getArticleInfo = () => {
        Axios.get(`https://southcoders-news.herokuapp.com/api/articles/${this.state.articleId}`).then(({ data }) => {
            this.setState({ article: data.article })
        }).catch(() => { this.setState({ article: null }) })
    }
    closeNewComment = () => {
        this.setState({ postingComment: false })
    }
    openAddComment = () => {
        this.setState({ postingComment: true })
    }
    createPsuedoComment = (partial) => {
        const { body, user_id } = partial
        const psuedo = { body, user_id, comment_id: 'psuedo', votes: 0, created_at: moment().format(), author: this.props.user.username }
        this.setState({ psuedos: [...this.state.psuedos, psuedo] })
    }

    handleCommentPosted = (comment) => {
        this.createPsuedoComment(comment)
        setTimeout(() => {
            this.setState({ postingComment: false })
        }, 3000)
    }

}

export default ViewArticle;