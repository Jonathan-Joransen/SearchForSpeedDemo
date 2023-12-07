import React, { useEffect, useState, useRef } from 'react'
import Result from './Result.js';
import resultsPageStyles from './ResultsPage.module.css'
import NoResults from './NoResults.js';
import PageNavigation from './PageNavigation.js';

const ResultsPage = (props) => {
    const [carIdxArr, setCarIdxArr] = useState([0, 10])
    const [carSub, setCarSub] = useState(props.cars.slice(carIdxArr[0], carIdxArr[1]))
    const resultsRef = useRef()

    useEffect(() => {
        resultsRef?.current.scrollIntoView({ behavior: 'smooth', block: "start", inline: "start"  })
    }, [])

    useEffect(() => {
        setCarSub(props.cars.slice(carIdxArr[0], carIdxArr[1]))
    }, [carIdxArr])

    useEffect(() => {
        setCarSub(props.cars.slice(carIdxArr[0], carIdxArr[1]))
    }, [props.cars])

    return (
        <>
            <div ref={resultsRef} className={resultsPageStyles.resultsContainer}>
                {carSub.length > 0
                    && carSub.map((car, idx) => <Result key={idx * 24} car={car} />)
                    }
            </div>
            {carSub.length === 0 && <NoResults />}
            {carSub.length > 0
                    && <PageNavigation resultsRef={resultsRef} carIdxArr={carIdxArr} setCarIdxArr={setCarIdxArr} cars={props.cars} />}
        </>
    )
}

export default ResultsPage