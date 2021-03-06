import React, { Fragment } from 'react';
import './List.css'
import { Link } from '@reach/router'
import Votes from '../Votes';
import Loading from '../../Loading';


const List = (props) => {
    const { articles, noArticles } = props
    return (
        <div className='List'>
            {articles.length === 0 && !noArticles && (<Loading />)}
            {noArticles && <Fragment><p>No articles exist... make a new article?</p><Link to='/articles/post'><button id='noArticlesBtn'>Make Article</button></Link>
            </Fragment>}
            {articles.length > 0 && articles.map((article) => {
                return (
                    <li key={`item${article.article_id}`} className='ArticleItem'><Link className='titleLink' key={`link${article.article_id}`} to={`/articles/${article.article_id}`}> <div className='articleText'>
                        <h4 className='ArticleTitle' key={article.article_id}>{`${article.title}`}</h4><div className='articleDetails'>
                            <span className='authorSpan'>{`By: ${article.author}`}</span><span className='dateSpan'>{article.created_at.slice(0, 10)}</span><span className='ccSpan'>{`${article.comment_count} comments`}</span></div> </div></Link>


                        <Votes key={`votes${article.article_id}`} articleId={article.article_id} votes={article.votes} /></li>
                )
            })}
        </div>
    );
};

export default List;