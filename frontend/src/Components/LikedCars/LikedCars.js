import React, { useState, useEffect } from 'react'
import Header from '../Header/Header.js';
import SearchPageLink from '../Times/SearchPageLink.js';
import likedStyles from './LikedCars.module.css';
import TimeResult from '../Times/TimeResult.js';

const LikedCars = (props) => {
    const [cars, setCars] = useState([])
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        const likedCars = localStorage.getItem('likedCars')
        let currCars = JSON.parse(likedCars)
        setCars(currCars)
    }, [timer])

    setInterval(() => {
        setTimer(timer + 1)
    }, 10000)

    return (
        <>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
            <div className={likedStyles.likedContainer}>
                <div className={likedStyles.likedTitle}>Liked Cars</div>
                {cars?.length > 0 && cars.map((car, idx) => {
                    return <TimeResult {...props} key={idx} car={car} />
                })}
                <SearchPageLink />
            </div>

        </>
    )
}

export default LikedCars