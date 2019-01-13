import React, { Component } from 'react';
import './NewArticle.css'
import Axios from 'axios';
import { Link } from '@reach/router'

class NewArticle extends Component {
    state = {
        body: '',
        title: '',
        topics: this.props.topics,
        chosenTopic: '',
        error: false,
        articleSent: false,
    }

    render() {
        const { topics, error, articleSent } = this.state
        return (
            <div id='NewArticle'>
                <h2>Add a New Article</h2>
                <form onSubmit={this.handleSubmit}>

                    <label htmlFor='title'>Article Title</label>
                    <input onChange={this.handleChange} id='title'></input>
                    <label htmlFor='topic'>Topic</label>
                    <select id='chosenTopic' onChange={this.handleChange}>
                        <option >Select a Topic</option>
                        {topics && topics.map((topic) => { return <option key={topic.slug}>{topic.slug}</option> })}
                    </select>
                    <label htmlFor='body'>Article Text</label>
                    <textarea onChange={this.handleChange} cols='80' rows='18' id='body'></textarea>
                    <button type='submit' disabled={articleSent}>Submit</button>
                    {error && <div id='error'>Please ensure all fields are completed</div>}
                    {articleSent && <Link className='visitArticle' to={`/articles/${articleSent}`}><button id='visitArticle'>Article posted! Visit Article</button></Link>}
                </form>

            </div>
        );
    }

    handleChange = (e) => {
        const key = e.target.id
        this.setState({ [key]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const articleToPost = { title: this.state.title, body: this.state.body, created_by: this.props.user.user_id }
        if (Object.values(articleToPost).some((x) => { return x.length < 1 }) || (!this.state.chosenTopic || this.state.chosenTopic === 'Select a Topic')) { this.setState({ error: true }) }
        else Axios.post(`https://southcoders-news.herokuapp.com/api/topics/${this.state.chosenTopic}/articles`, articleToPost).then((res) => { this.setState({ error: false, articleSent: res.data.article.article_id }) })
    }

}

export default NewArticle;