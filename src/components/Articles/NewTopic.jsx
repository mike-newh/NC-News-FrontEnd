import React, { Component } from 'react';
import './NewTopic.css'
import Axios from 'axios';

class NewTopic extends Component {
    state = {
        slug: '',
        description: '',
        reqSent: false,
        resRecieved: false,
        error: false,
        error422: false
    }
    render() {
        return (
            <div id='NewTopic'>
            <button id='close' onClick={this.props.handleClose}>x</button>
            {this.state.reqSent ? <p>Loading...</p> : this.state.resRecieved && !this.state.error ? <p>Ok!</p> :
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='slugInput'>Topic Name</label>
                    <input onChange={this.handleSlug} id='slugInput'/>
                    <label htmlFor='description'>Description</label>
                    <textarea onChange={this.handleDescription} cols='50' rows='2' id='description'/>
                    <button id='topicSubmit' type='submit'>submit</button>
                    
                </form>}
                {this.state.error && !this.state.reqSent && <p>Post failed, please ensure topic name is completed</p>}
                {this.state.error422 && <p>Topic already exists</p>}
            </div>
        );
    }

    handleSubmit =  (e) => {
        e.preventDefault()
        console.log(this.state)
        const {slug, description} = this.state
        if (slug.length < 1){this.setState({error: true})}
        else {const newTopic = {slug, description}
        this.setState({reqSent: true, error422: false})
        Axios.post('https://southcoders-news.herokuapp.com/api/topics', newTopic).then((res)=>{this.setState({resRecieved: true, error: false, error422: false, reqSent: false})}).catch((res)=>{
            if (res.response.status === 422)
            this.setState({error422: true, reqSent: false})
        })}
    }
    handleSlug = (e) => {
        this.setState({slug: e.target.value})
    }
    handleDescription = (e) => {
        this.setState({description: e.target.value})
    }

}

export default NewTopic;