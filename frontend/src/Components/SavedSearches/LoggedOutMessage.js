import React from 'react'
import Button from '@material-ui/core/Button';
import savedSearchesStyles from './SavedSearches.module.css'
import { Link } from 'react-router-dom';

const LoggedOutMessage = () => {
    return (
        <div className={savedSearchesStyles.loggedOutContainer}>
            <h3 className={savedSearchesStyles.searchTitle}>This feature is included with a premium subscription.</h3>
            <Link to="/Subscribe">
                <button className={savedSearchesStyles.subscribeButton}>Subscribe</button>
            </Link>
        </div>
    )
}

export default LoggedOutMessage