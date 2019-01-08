import React, { Component } from 'react';
import TopicSelect from './TopicSelect';
import '../App.css';
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
        if (this.props.topic){
            this.setState({currentTopic: this.props.topic})
        }
        this.getTopics()
        this.getArticles()
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.topic !== this.props.topic && prevState.articles === this.state.articles) {
            this.setState({articles: []})
        }
        if (prevProps.topic !== this.props.topic){
        this.getArticles()
        }else console.log(this.state.articles)
    }

    getTopics = () => {
        console.log('GET REQUEST SENT')
        Axios.get(`https://southcoders-news.herokuapp.com/api/topics`).then(({data})=>{
            this.setState({availableTopics: data.topics})
        })
    }
    getArticles = () => {
        if (this.props.topic){
            console.log('GET REQUEST SENT')
        Axios.get(`https://southcoders-news.herokuapp.com/api/topics/${this.props.topic}/articles`).then(({data})=>{this.setState({articles: data.articles})})
        }
        else {
            console.log('GET REQUEST SENT')
            Axios.get(`https://southcoders-news.herokuapp.com/api/articles`).then(({data})=>{this.setState({articles: data.articles})})
        }


    }
}

export default Articles;