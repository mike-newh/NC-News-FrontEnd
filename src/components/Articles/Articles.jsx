import React, { Component } from 'react';
import TopicSelect from './TopicSelect';
import '../Grid.css';
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
        sort_ascending: false 

    }
    render() {
        return (
            <div className='Articles'>
            {!this.state.currentTopic && <TopicSelect handleAddButton={this.handleAddButton} topics={this.state.availableTopics}/>} 
            {this.state.currentTopic && <TopicScroll topics={this.state.availableTopics}/>}
            <div className='QueryWrap'>
            <Queries handlePage={this.handlePage}handleFilter={this.handleFilter} handleLimit={this.handleLimit} handleSortBy={this.handleSortBy} handleSortAsc={this.handleSortAsc}/>
            <List articles={this.state.articles}/></div>
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
        console.log(this.state)
    }
    // handle filter will affect vote optimism by refetching vote count but not resetting vote optimism state
    handlePage = (int) => {
        this.setState({page: this.state.page+int}, ()=>{
            if (this.state.page < 1){this.setState({page: 1})}
            else {this.getArticles().catch((err)=>{this.setState({page: this.state.page-int})}); console.log('firing page')}
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
        const {page, limit, sort_by, sort_ascending} = this.state
        const queryString = `?limit=${limit}&p=${page}&sort_by=${sort_by}&sort_ascending=${sort_ascending}`
        console.log(queryString)
        if (this.state.currentTopic){
            console.log('GET REQUEST SENT Specific aricles')
        return Axios.get(`https://southcoders-news.herokuapp.com/api/topics/${this.state.currentTopic}/articles${queryString}`).then(({data})=>{this.setState({articles: data.articles})})
        }
        else {
            console.log('GET REQUEST SENT all articles')
            return Axios.get(`https://southcoders-news.herokuapp.com/api/articles${queryString}`).then(({data})=>{this.setState({articles: data.articles})})
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