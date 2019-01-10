import React, {Fragment} from 'react';
import '../Grid.css';
import './List.css'
import { Link } from '@reach/router'
import Votes from '../Votes';


const List = (props) => {
    return (
        <div className='List'>
            { props.articles.length === 0 && (<p>Loading</p>)}
            {   
                props.articles.length > 0 && props.articles.map((article)=>{return (
                <div key={`item${article.article_id}`} className='ArticleItem'><Link key={`link${article.article_id}`} to={`/articles/${article.article_id}`}><li className='ArticleTitle' key={article.article_id}>{`Title: ${article.title} | created: ${article.created_at.slice(0,10)} | id: ${article.article_id} | CC ${article.comment_count} | Author: ${article.author}`}</li></Link><Votes key={`votes${article.article_id}`} articleId={article.article_id} votes={article.votes}/></div>
            )})}
        </div>
    );
};

export default List;