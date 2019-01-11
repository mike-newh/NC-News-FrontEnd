import React, { Component } from 'react';
import './Articles.css'

class Queries extends Component {
 
    render() {
        return (
            <div id='Queries'>
             <button className='pgBtn' onClick={()=>{this.props.handlePage(-1)}}><i class="fas fa-chevron-circle-left"></i>Prev Page</button>
                <form id='queryForm' onSubmit={this.props.handleFilter}>
                    <label htmlFor='limit'>Results per page:</label>
                    <select onChange={this.props.handleLimit} id='limit'>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option></select>
                    <label htmlFor='sortBy'>Order by:</label>
                    <select onChange={this.props.handleSortBy} id='sortBy'>
                    <option value='votes'>Votes</option>
                    <option value='comment_count'>Comment Count</option>
                    <option value='title'>Title</option>
                    <option value='created_at'>Date</option>
                    </select>
                    <div><input onClick={this.props.handleSortAsc} type='radio' name='sortAsc' value={true}/>Ascending<br/></div>
                    <div><input onClick={this.props.handleSortAsc} type='radio' name='sortAsc' value={false} defaultChecked/>Descending<br/></div>
                    <button type='submit'>Filter</button>
                </form>
                <button className='pgBtn' onClick={()=>{this.props.handlePage(1)}}>Next Page<i class="fas fa-chevron-circle-right"></i></button>
            </div>
        );
    }

}

export default Queries;