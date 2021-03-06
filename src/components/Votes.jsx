import React, { Component } from 'react';
import './Votes.css'
import Axios from 'axios';

class Votes extends Component {
    state = {
        voteCast: 0
    }
    render() {
        const { voteCast } = this.state
        const { votes } = this.props
        return (
            <div className='VotesObj'>
                <p className='voteCount'>{`${votes + voteCast}`}<span>Points</span></p>

                <div className='btnWrap'>
                    <i onClick={() => { this.handleVote(1) }} className={`far fa-caret-square-up ${voteCast === 1 ? ' vtUp' : ''}`} ></i>
                    <i onClick={() => { this.handleVote(-1) }} className={`far fa-caret-square-down ${voteCast === -1 ? ' vtDown' : ''}`}></i>
                </div>
            </div>
        );
    }
    handleVote = (int) => {
        const { commentId } = this.props
        const voteObj = { inc_votes: int }
        if ((this.state.voteCast === 1 && int === 1) || (this.state.voteCast === -1 && int === -1)) { }
        else {
            this.setState({ voteCast: this.state.voteCast + int })
            Axios.patch(commentId ? `https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}/comments/${commentId}` : `https://southcoders-news.herokuapp.com/api/articles/${this.props.articleId}`, voteObj).catch((err) => { this.setState({ voteCast: this.state.voteCast - int }) })
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.votes !== this.props.votes) { this.setState({ voteCast: 0 }) }
    }
}

export default Votes;