import React from 'react';

function CommentQuery(props) {
    const { handleQuery } = props
    return (
        <div id='CommentQuery'>
            <label htmlFor='commentSort'>Sort by</label>
            <select onChange={handleQuery} id='commentSort'>
                <option value={`?sort_by=votes&sort_ascending=false`}>Votes (Highest)</option>
                <option value={`?sort_by=votes&sort_ascending=true`}>Votes (Lowest)</option>
                <option value={`?sort_by=created_at&sort_ascending=false`}>Date (Newest)</option>
                <option value={`?sort_by=created_at&sort_ascending=true`}>Date (Oldest)</option>
            </select>

        </div>
    );
}

export default CommentQuery;