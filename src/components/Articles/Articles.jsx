import React, { Component, Fragment } from 'react';
import TopicSelect from './TopicSelect';
import List from './List';
import Axios from 'axios'
import NewTopic from './NewTopic';
import Queries from './Queries';
import './Articles.css'
import FourOhFour from '../../FourOhFour';

class Articles extends Component {
    state = {
        currentTopic: '',
        availableTopics: this.props.topics,
        articles: [],
        postingTopic: false,
        limit: 10,
        page: 1,
        sort_by: 'votes',
        sort_ascending: false,
        noArticles: false,
        pageEnd: true,
        articleCount: 0,

    }
    render() {
        const { availableTopics, pageEnd, page, articles, noArticles, postingTopic } = this.state
        return (
            <div id='Articles'>
                <TopicSelect handleAddButton={this.handleAddButton} topics={availableTopics} />
                <div id='QueryAndList'>
                    {this.checkValidTopic() ? <><Queries pageEnd={pageEnd} pageNum={page} handlePage={this.handlePage} handleFilter={this.handleFilter} handleLimit={this.handleLimit} handleSortBy={this.handleSortBy} handleSortAsc={this.handleSortAsc} />
                        <List noArticles={noArticles} articles={articles} /></> : <FourOhFour />}
                </div>
                {postingTopic && <NewTopic handleClose={this.handleClose} />}
            </div>
        );
    }

    checkValidTopic = () => {
        const check = (this.state.availableTopics.some((topic) => { return topic.slug === this.state.currentTopic }) || !this.state.currentTopic)
        return check
    }

    handleLimit = (e) => {
        this.setState({ limit: e.target.value, page: 1 }, ()=>{this.handleFilter()})
    }
    handleSortBy = (e) => {
        this.setState({ sort_by: e.target.value }, ()=>{this.handleFilter()})
    }
    handleSortAsc = (e) => {
        this.setState({ sort_ascending: e.target.value }, ()=>{this.handleFilter()})
    }
    handleFilter = (e) => {
        this.getArticles()
    }
    handlePage = (int) => {
        this.setState({ page: this.state.page + int }, () => {
            if (this.state.page < 1) { this.setState({ page: 1 }) }
            else { this.getArticles().catch((err) => { this.setState({ page: this.state.page - int }) }) }
        })



    }

    componentDidMount() {
        if (this.props.topic) { this.setState({ currentTopic: this.props.topic }) }
        else this.getArticles()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentTopic !== this.state.currentTopic && prevState.articles === this.state.articles) {
            this.setState({ articles: [] })
        }
        if (prevProps.topic !== this.props.topic) {
            this.setCurrentTopic()
        }
        if (prevState.currentTopic !== this.state.currentTopic) {
            this.getArticles()
        }
        if (prevState.articles !== this.state.articles) {
            this.checkPageEnd()
        }
        if (prevProps.topics !== this.props.topics) { this.setState({ availableTopics: this.props.topics }) }
    }
    checkPageEnd = () => {
        const { page, limit, articleCount } = this.state
        this.setState({ pageEnd: ((page * limit) < articleCount) })
    }

    handleClose = () => {
        this.setState({ postingTopic: false })
    }

    setCurrentTopic = () => {
        this.setState({ currentTopic: this.props.topic })
    }
    getArticles = () => {
        if (!this.checkValidTopic()) { }
        else {
            const { page, limit, sort_by, sort_ascending, currentTopic } = this.state
            const queryString = `?limit=${limit}&p=${page}&sort_by=${sort_by}&sort_ascending=${sort_ascending}`
            if (currentTopic) {
                return Axios.get(`https://southcoders-news.herokuapp.com/api/topics/${currentTopic}/articles${queryString}`).then(({ data }) => { this.setState({ articles: data.articles, noArticles: false, articleCount: data.count }) }).catch(() => { this.setState({ noArticles: true, articleCount: 0 }) })
            }
            else {
                return Axios.get(`https://southcoders-news.herokuapp.com/api/articles${queryString}`).then(({ data }) => { this.setState({ articles: data.articles, noArticles: false, articleCount: data.count }) }).catch(() => { this.setState({ noArticles: true, articleCount: 0 }) })
            }
        }
    }
    handleAddButton = (e) => {
        e.preventDefault()
        this.setState({ postingTopic: true })
    }
    compileQueries = () => {

    }
}

export default Articles;