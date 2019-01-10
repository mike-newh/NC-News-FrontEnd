import React, { Component } from 'react';
import './ArticleText.css'
import Axios from 'axios';
import { Link } from '@reach/router'


class ArticleText extends Component {
    state = {
        toBeDeleted: false,
        deleteComplete: false,
        delReq: false,
        failedToDelete: false
    }
    render() {
        const {article} = this.props
    return (
        <div id='ArticleText'>
        
            {article === undefined && `Loading`}
            {article === null && '404'}
            {article && article.body}
            {article ? article.author === this.props.user.username ? this.state.toBeDeleted ? this.state.deleteComplete ? <Link to='/'><button>Article Deleted! Go back</button></Link>: (<button onClick={this.handleConfirm} id='articleDelete' >Confirm</button>) : (<button id='articleDelete' onClick={this.handleDelete}>Delete</button>) : <></> : <></>}
            {this.state.failedToDelete && <p>Deletion Failed</p>}


        </div>
    );

}
handleDelete = () => {
       this.setState({toBeDeleted: true}) 
}
handleConfirm = () => {
    this.setState({delReq: true, failedToDelete: false})
    Axios.delete(`https://southcoders-news.herokuapp.com/api/articles/${this.props.article.article_id}`).then(()=>{this.setState({deleteComplete: true})}).catch(()=>{this.setState({failedToDelete:true})})
}

}

export default ArticleText;

