import React from 'react';
import './Articles.css'

function Queries(props) {
    const { pageNum, handlePage, handleFilter, handleLimit, handleSortBy, handleSortAsc, pageEnd } = props
    return (
        <div id='Queries'>
            {pageNum > 1 ? <button className='pgBtn' onClick={() => { handlePage(-1) }} disabled={pageNum === 1}><i className="fas fa-chevron-circle-left"></i>Prev Page</button> : <div id='prevPlacehold'></div>}
            <form id='queryForm' onSubmit={handleFilter}>
                <label htmlFor='limit'>Results per page:</label>
                <select onChange={handleLimit} id='limit'>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option></select>
                <label htmlFor='sortBy'>Order by:</label>
                <select onChange={handleSortBy} id='sortBy'>
                    <option value='votes'>Votes</option>
                    <option value='comment_count'>Comment Count</option>
                    <option value='title'>Title</option>
                    <option value='created_at'>Date</option>
                </select><div id='radioWrap'>
                <div><input onClick={handleSortAsc} type='radio' name='sortAsc' value={true} />Ascending</div>
                <div><input onClick={handleSortAsc} type='radio' name='sortAsc' value={false} defaultChecked />Descending</div></div>
                <button type='submit'>Filter</button>
            </form>
            {pageEnd ?
                <button className='pgBtn' onClick={() => { handlePage(1) }}>Next Page<i className="fas fa-chevron-circle-right"></i></button> : <div id='prevPlacehold'></div>}
        </div>
    );


}

export default Queries;

