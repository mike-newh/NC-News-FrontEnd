import React from 'react';
import './ArticleText.css'

const ArticleText = (props) => {
    return (
        <div id='ArticleText'>
            {props.article === undefined && `Loading`}
            {props.article === null && '404'}
            {props.article && props.article.body}
        </div>
    );
};

export default ArticleText;