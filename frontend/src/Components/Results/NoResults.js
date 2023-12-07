import React from 'react'
import resultsStyles from './ResultsPage.module.css';
import noResultsStyles from './NoResults.module.css';
import { Link } from 'react-router-dom';
const NoResults = () => {
  return (
    <div className={resultsStyles.noResultsContainer}>
      <div className={resultsStyles.noResultsHeader}>
        0 Found Right Now
      </div>
      <div className={resultsStyles.noResultsSubHeader}>
        Try other options or get email alerts<br></br> when new cars are found
      </div>
      <div className={noResultsStyles.noResultAction}>
        <Link to="/Searches"><span className={noResultsStyles.linkFancy}>Get Alerts</span></Link>
      </div>
    </div>

  )
}

export default NoResults