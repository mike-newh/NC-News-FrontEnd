import React from 'react';
import '../Grid.css';
import { Link } from '@reach/router'


const List = (props) => {
    return (
        <div className='List'>
            { props.articles.length === 0 && (<p>Loading</p>)}
            {   
                props.articles.length > 0 && props.articles.map((article)=>{return (
                <Link key={`link${article.article_id}`} to={`/articles/${article.article_id}`}><li key={article.article_id}>{article.title}</li></Link>
            )})}
        </div>
    );
};

export default List;