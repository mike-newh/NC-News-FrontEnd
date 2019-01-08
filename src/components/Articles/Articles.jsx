import React, { Component } from 'react';
import TopicSelect from './TopicSelect';
import '../Grid.css';
import List from './List';
import TopicScroll from './TopicScroll';
import Axios from 'axios'


// Maybe replace conditional rendering with router once enpoints established
class Articles extends Component {
    state = {
        currentTopic: '',
        availableTopics: [],
        articles: []
    }
    render() {
        return (
            <div className='Articles'>
            {!this.state.currentTopic && <TopicSelect topics={this.state.availableTopics}/>} 
            {this.state.currentTopic && <TopicScroll topics={this.state.availableTopics}/>}
            <List articles={this.state.articles}/>
            </div>
        );
    }
    componentDidMount(){
        this.getTopics()
        if (this.props.topic){this.setState({currentTopic: this.props.topic})}
        else this.getArticles()
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.currentTopic !== this.state.currentTopic && prevState.articles === this.state.articles) {
            this.setState({articles: []})
        }
        if (prevProps.topic !== this.props.topic){
            this.setCurrentTopic()
        }
        if (prevState.currentTopic !== this.state.currentTopic){
            this.getArticles()
        }
    }

    getTopics = () => {
        console.log('GET REQUEST SENT topics')
        Axios.get(`https://southcoders-news.herokuapp.com/api/topics`).then(({data})=>{
            this.setState({availableTopics: data.topics})
        })
    }
    setCurrentTopic = () => {
        this.setState({currentTopic: this.props.topic}, ()=>{
            console.log(`topic is now ${this.state.currentTopic}`)
        })
    }
    getArticles = () => {
        if (this.state.currentTopic){
            console.log('GET REQUEST SENT Specific aricles')
        Axios.get(`https://southcoders-news.herokuapp.com/api/topics/${this.state.currentTopic}/articles`).then(({data})=>{this.setState({articles: data.articles})})
        }
        else {
            console.log('GET REQUEST SENT all articles')
            Axios.get(`https://southcoders-news.herokuapp.com/api/articles`).then(({data})=>{this.setState({articles: data.articles})})
        }


    }
}

export default Articles;