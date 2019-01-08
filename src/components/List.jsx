import React from 'react';
import '../App.css';
import '../Grid.css';

const List = (props) => {
    return (
        <div className='List'>
            { props.articles.length === 0 && (<p>Loading</p>)}
            {   
                props.articles.length > 0 && props.articles.map((article)=>{return (
                <li key={article.article_id}>{article.title}</li>
            )})}
        </div>
    );
};

export default List;