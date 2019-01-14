import React, { Component } from 'react';
import './NewTopic.css'
import Axios from 'axios';
import Loading from '../../Loading';

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
        const { reqSent, resRecieved, error, error422 } = this.state
        return (
            <div id='NewTopic'>
                <button className='closex' id='close' onClick={this.props.handleClose}><i className="fas fa-times"></i></button>
                {reqSent ? <Loading /> : resRecieved && !error ? <i style={{ marginTop: '8vh', color: 'green', 'fontSize': '100px', 'lineHeight': '100%' }} className="commentTick fas fa-check"></i> :
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='slugInput'>Topic Name</label>
                        <input onChange={this.handleSlug} id='slugInput' />
                        <label htmlFor='description'>Description</label>
                        <textarea onChange={this.handleDescription} cols='50' rows='2' id='description' />
                        <button id='topicSubmit' type='submit'>submit</button>

                    </form>}
                {error && !reqSent && <p>Post failed, please ensure topic name is completed</p>}
                {error422 && <p>Topic already exists</p>}
            </div>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { slug, description } = this.state
        if (slug.length < 1) { this.setState({ error: true }) }
        else {
            const newTopic = { slug, description }
            this.setState({ reqSent: true, error422: false })
            Axios.post('https://southcoders-news.herokuapp.com/api/topics', newTopic).then((res) => { this.setState({ resRecieved: true, error: false, error422: false, reqSent: false }, ()=>{setTimeout(()=>{this.props.handleClose()}, 2000)})}).catch((res) => {
                if (res.response.status === 422)
                    this.setState({ error422: true, reqSent: false })
            })
        }
    }
    handleSlug = (e) => {
        this.setState({ slug: e.target.value })
    }
    handleDescription = (e) => {
        this.setState({ description: e.target.value })
    }

}

export default NewTopic;