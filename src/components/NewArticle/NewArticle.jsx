import React, { Component } from 'react';
import './NewArticle.css'
import Axios from 'axios';
import { Link } from '@reach/router'

class NewArticle extends Component {
    state = {
        body: '',
        title: '',
        topics: [],
        chosenTopic: '',
        error: false,
        articleSent: false,
    }

    render() {
        return (
            <div id='NewArticle'>
                <h2>Add a New Article</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='title'>Article Title</label>
                    <input onChange={this.handleTitle} id='title'></input>
                    <label htmlFor='topicSelect'>Topic</label>
                    <select id='topicSelect' onChange={this.handleTopic}>
                        <option >Select a Topic</option>
                        {this.state.topics && this.state.topics.map((topic)=>{return <option key={topic.slug}>{topic.slug}</option>})}
                    </select>
                    <label htmlFor='articleBody'>Article Text</label>
                    <textarea onChange={this.handleBody} cols='80' rows='18' id='articleBody'></textarea>
                    <button type='submit'>Submit</button>
                </form>
                {this.state.error && <div id='error'>Please ensure all fields are completed</div>}
                {this.state.articleSent && <Link to={`/articles/${this.state.articleSent}`}><button>Article posted! Visit Article</button></Link>}
            </div>
        );
    }
    componentDidMount(){
        this.getTopics()
    }
    handleBody = (e) => {
        this.setState({body: e.target.value})
    }
    handleTitle = (e) => {
        this.setState({title: e.target.value})
    }
    handleTopic = (e) => {
        this.setState({chosenTopic: e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const articleToPost = {title: this.state.title, body: this.state.body, created_by: this.props.user.user_id}
        if (Object.values(articleToPost).some((x)=>{return x.length < 1}) || (!this.state.chosenTopic || this.state.chosenTopic === 'Select a Topic')){this.setState({error: true}, ()=>{console.log(this.state)})}
        else Axios.post(`https://southcoders-news.herokuapp.com/api/topics/${this.state.chosenTopic}/articles`, articleToPost).then((res)=>{this.setState({error: false, articleSent: res.data.article.article_id})}).catch((err)=>{console.log(err)})
    }
    getTopics = () => {
        Axios.get(`https://southcoders-news.herokuapp.com/api/topics`).then(({data})=>{
            this.setState({topics: data.topics}, ()=>{console.log(this.state)})
        })
    }
}

export default NewArticle;