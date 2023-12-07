import React, { useState } from 'react';
import optionStyles from './SearchOptions.module.css';

let SearchOption = (props) => {
    const [useOption, setUseOption] = useState(false)
    const [wrapper, setWrapper] = useState(optionStyles.searchOptionWrapper)
    
    let toggleOption = () => {
        if (useOption) {
            setWrapper(optionStyles.searchOptionWrapper)
           return setUseOption(false)
        }
        setWrapper(optionStyles.searchOptionWrapperPressed)
        setUseOption(true)
    }

    return (
        <div className={optionStyles.searchOptionContainer}>
           <div className={wrapper}>
               <div className={optionStyles.optionName} onClick={toggleOption}> {props.optionName} </div>               
           </div>
        </div>
    )
}


export default SearchOption