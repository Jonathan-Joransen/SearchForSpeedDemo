import React, { useEffect, useState } from 'react'
import ResultsPage from './ResultsPage.js';
import resultStyles from './Result.module.css'
import axios from 'axios';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import { useSearchParams } from 'react-router-dom';

const SavedSearchResults = (props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [cars, setCars] = useState([])

    let setDetails = (car) => {
        let details = []
        details.push({ key: "0-60", value: `${Number(car.M.speed.N).toFixed(1)}s*` })
        details.push({ key: "Price", value: car.M.price.S })
        details.push({ key: "Site", value: car.M.retailer.S })
        if (car?.trim && car?.trim != "unkown") {
            if (car?.trim?.length > 10) {
                details.push({ key: "Trim", value: `${car.M.trim.S.substring(0, 15)}...` })
            }
            else {
                details.push({ key: "Trim", value: car.M.trim.S })
            }
        }
        return details;
    }

    useEffect(() => {
        let searchId = searchParams.get('search')
        let date = searchParams.get('search2')
        let url = `${props.config.baseApiUrl}/Results?searchId=${searchId}&date=${date}`
        axios.get(url).then(res => {
            res.data.map((car, idx) => {
                car.link = car.M.link.S
                car.image = car.M.image.S
                car.details = setDetails(car)
                car.placement = idx + 1
                car.title = `${car.M.year.S} ${car.M.make.S} ${car.M.model.S}`
            })
            setCars(res.data)
        })
    }, [])


    return (
        <div>
            <Header {...props} />
            {cars.length > 0 ? <ResultsPage cars={cars} />
                : <div className={resultStyles.bigHeader}>No results at this time. Please check back later. Results are collected daily.</div>}
            <Footer {...props} />
        </div>
    )
}

export default SavedSearchResults