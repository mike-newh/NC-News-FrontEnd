import React, { Component } from 'react';
import '../Grid.css';

class ViewArticle extends Component {
    render() {
        return (
            <div className='ViewArticle'>
            
                this is article {this.props.articleId}
            </div>
        );
    }
}

export default ViewArticle;