import timeStyles from './TimeResultSpreedsheet.module.css';
import React from 'react'

const TimeResultSpreedSheet = (props) => {
  return (
    <div className={timeStyles.timeResultSpreesheetContainer}>
        {props.children}
    </div>
  )
}

export default TimeResultSpreedSheet