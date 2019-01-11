import React, { Component } from 'react';
import TopicSelect from './TopicSelect';
import List from './List';
import TopicScroll from './TopicScroll';
import Axios from 'axios'
import NewTopic from './NewTopic';
import Queries from './Queries';
import './Articles.css'


// Maybe replace conditional rendering with router once enpoints established
class Articles extends Component {
    state = {
        currentTopic: '',
        availableTopics: [],
        articles: [],
        postingTopic: false,
        limit: 10,
        page:1,
        sort_by: 'votes',
        sort_ascending: false,
        noArticles: false,

    }
    render() {
        return (
            <div id='Articles'>
            {!this.state.currentTopic && <TopicSelect handleAddButton={this.handleAddButton} topics={this.state.availableTopics}/>} 
            {this.state.currentTopic && <TopicScroll topics={this.state.availableTopics}/>}
            <div id='QueryAndList'>
            <Queries handlePage={this.handlePage}handleFilter={this.handleFilter} handleLimit={this.handleLimit} handleSortBy={this.handleSortBy} handleSortAsc={this.handleSortAsc}/>
            <List noArticles={this.state.noArticles} articles={this.state.articles}/>
            </div>
            {this.state.postingTopic && <NewTopic handleClose={this.handleClose}/>}
            </div>
        );
    }
    handleLimit = (e) => {
        this.setState({limit: e.target.value})
    }
    handleSortBy = (e) => {
        this.setState({sort_by: e.target.value})
    }
    handleSortAsc = (e) => {
        this.setState({sort_ascending: e.target.value})
    }
    handleFilter = (e) => {
        e.preventDefault()
        this.getArticles()
    }
    // handle filter will affect vote optimism by refetching vote count but not resetting vote optimism state
    handlePage = (int) => {
        this.setState({page: this.state.page+int}, ()=>{
            if (this.state.page < 1){this.setState({page: 1})}
            else {this.getArticles().catch((err)=>{this.setState({page: this.state.page-int})})}
        })

            
         
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
    handleClose = () => {
        this.setState({postingTopic: false})
    }

    getTopics = () => {
   
        Axios.get(`https://southcoders-news.herokuapp.com/api/topics`).then(({data})=>{
            this.setState({availableTopics: data.topics})
        })
    }
    setCurrentTopic = () => {
        this.setState({currentTopic: this.props.topic})
    }
    getArticles = () => {
        const {page, limit, sort_by, sort_ascending} = this.state
        const queryString = `?limit=${limit}&p=${page}&sort_by=${sort_by}&sort_ascending=${sort_ascending}`
        if (this.state.currentTopic){
        return Axios.get(`https://southcoders-news.herokuapp.com/api/topics/${this.state.currentTopic}/articles${queryString}`).then(({data})=>{this.setState({articles: data.articles, noArticles: false})}).catch(()=>{this.setState({noArticles: true})})
        }
        else {
            return Axios.get(`https://southcoders-news.herokuapp.com/api/articles${queryString}`).then(({data})=>{this.setState({articles: data.articles, noArticles: false})}).catch(()=>{this.setState({noArticles: true})})
        }
    }
    handleAddButton = (e) => {
        e.preventDefault()
        this.setState({postingTopic: true})
    }
    compileQueries = () => {

    }
}

export default Articles;