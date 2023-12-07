import { Link } from 'react-router-dom';
import React from 'react'
import timeStyles from './Times.module.css';

const SearchPageLink = () => {
    return (
        <div className={timeStyles.timeSearchContainer}>
            <h5 className={timeStyles.searchPageHeader}>What's The Fastest Car I Can Buy?</h5>
            <div className={timeStyles.timeSearchWrapper}>
                <div className={timeStyles.searchPageButtonContainer}>
                    <Link to="/Search"><button className={timeStyles.searchButtonFindOut}>Find Out</button></Link>
                </div>
            </div>
        </div>
    )
}

export default SearchPageLink