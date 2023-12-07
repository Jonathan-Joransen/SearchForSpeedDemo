import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import savedSearchStyles from './SavedSearch.module.css'
import buttonStyles from '../Profile/DrawBorderButton.module.scss'

const SavedSearch = (props) => {
    const [disabled, setDisabled] = useState(true)
    const [zip, setZip] = useState(props.zip)
    const [maxZeroToSixty, setMaxZeroToSixty] = useState(props.maxZeroToSixty)
    const [dist, setDistance] = useState(props.dist)
    const [includeAuctionSale, setIncludeAuctionSale] = useState(props.includeAuctionSale)
    const [sale, setSaleType] = useState(props.sale)
    const [body, setBody] = useState(props.body)
    const [transmission, setTransmission] = useState(props.transmission)
    const [minPrice, setMinPrice] = useState(props.minPrice)
    const [maxPrice, setMaxPrice] = useState(props.maxPrice)
    const [minYear, setMinYear] = useState(props.minYear)
    const [maxYear, setMaxYear] = useState(props.maxYear)
    const [minMileage, setMinMileage] = useState(props.minMileage)
    const [maxMileage, setMaxMileage] = useState(props.maxMileage)
    const [latestUnix, setLatestUnix] = useState()

    useEffect(() => {
        axios.get(`${props.config.baseApiUrl}/User/Search/Latest?searchId=${props.dbSearchId}`, {
            headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }
        }).then(res => {
                setLatestUnix(res.data.date)
            }).catch((err) => {
                console.error(err)                
                if (err.response.status < 500 && err.response.status >= 400){
                    props.logoutUser()
                }
            })
    }, [])

    let deleteSearch = () => {
        axios.post(`${props.config.baseApiUrl}/User/Search/Remove`, {
            searchId: props.dbSearchId,
            email: props.email
        }, {
            headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }
        }).then(res => {
            props.setAddSearch(props.dbSearchId)
        }).catch((err) => {
            console.error(err)                
            if (err.response.status < 500 && err.response.status >= 400){
                props.logoutUser()
            }
        })
    }

    return (
        <div className={savedSearchStyles.savedSearchContainer}>
            <div className={savedSearchStyles.savedSearchWrapper}>
                <div className={savedSearchStyles.savedSearchWrapperLeft}>
                    <label className={savedSearchStyles.searchItemLabel}>Zip</label>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={zip} disabled={disabled} onInput={(e) => setZip(e.target.value)}></input>
                    <label className={savedSearchStyles.searchItemLabel}>Max 0-60</label>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={`${maxZeroToSixty}s`} disabled={disabled} onInput={(e) => setMaxZeroToSixty(e.target.value)}></input>
                    <label className={savedSearchStyles.searchItemLabel}>Distance</label>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={dist} disabled={disabled} onInput={(e) => setDistance(e.target.value)}></input>
                    <label className={savedSearchStyles.searchItemLabel}>Price</label>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={minPrice} disabled={disabled} onInput={(e) => setMinPrice(e.target.value)}></input>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={maxPrice} disabled={disabled} onInput={(e) => setMaxPrice(e.target.value)}></input>
                    <label className={savedSearchStyles.searchItemLabel}>Year</label>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={minYear} disabled={disabled} onInput={(e) => setMinYear(e.target.value)}></input>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={maxYear} disabled={disabled} onInput={(e) => setMaxYear(e.target.value)}></input>
                    <label className={savedSearchStyles.searchItemLabel}>Mileage</label>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={minMileage} disabled={disabled} onInput={(e) => setMinMileage(e.target.value)}></input>
                    <input className={savedSearchStyles.savedSearchInput} placeholder={maxMileage} disabled={disabled} onInput={(e) => setMaxMileage(e.target.value)}></input>

                </div>
                <div className={savedSearchStyles.savedSearchWrapperRight}>

                    <label className={savedSearchStyles.searchItemLabel}>Body Type</label>
                    <select onInput={(e) => setBody(e.target.value)} className={savedSearchStyles.savedSearchInput} value={body} disabled={disabled} name="bodyTypes" id="bodyTypes">
                        <option value="all">All</option>
                        <option value="sedan">Sedan</option>
                        <option value="coupe">Coupe</option>
                        <option value="convertible">Convertible</option>
                        <option value="wagon">Wagon</option>
                        <option value="hatchback">HatchBack</option>
                        <option value="suv">SUV</option>
                        <option value="minivan">MiniVan</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                    </select>
                    <label className={savedSearchStyles.searchItemLabel}>Sale</label>
                    <div className={savedSearchStyles.selectorContainer}>
                        <div className={savedSearchStyles.selectorWrapper}>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="saleAll" name={`sale${props.tagKey}`} disabled={disabled} checked={sale === "all"} onInput={(e) => setSaleType("all")}></input>
                                <label htmlFor="saleAll" className={savedSearchStyles.selectorItemLabel}>All</label>
                            </div>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="salePrivate" name={`sale${props.tagKey}`} disabled={disabled} checked={sale === "private"} onInput={(e) => setSaleType("private")}></input>
                                <label htmlFor="salePrivate" className={savedSearchStyles.selectorItemLabel}>Private</label>
                            </div>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="saleDealer" name={`sale${props.tagKey}`} disabled={disabled} checked={sale === "dealer"} onInput={(e) => setSaleType("dealer")}></input>
                                <label htmlFor="saleDealer" className={savedSearchStyles.selectorItemLabel}>Dealer</label>
                            </div>
                        </div>
                    </div>
                    <label className={savedSearchStyles.searchItemLabel}>Include Auctions</label>
                    <div className={savedSearchStyles.selectorContainer}>
                        <div className={savedSearchStyles.selectorWrapper}>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="auction1" disabled={disabled} checked={includeAuctionSale} name={`auction${props.tagKey}`} onInput={(e) => setIncludeAuctionSale(true)}></input>
                                <label htmlFor="auction1" className={savedSearchStyles.selectorItemLabel}>Yes</label>
                            </div>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="auction" disabled={disabled} checked={!includeAuctionSale} name={`auction${props.tagKey}`} onInput={(e) => setIncludeAuctionSale(false)}></input>
                                <label htmlFor="auction" className={savedSearchStyles.selectorItemLabel}>No</label>
                            </div>
                        </div>
                    </div>
                    <label className={savedSearchStyles.searchItemLabel}>Transmission:</label>
                    <div className={savedSearchStyles.selectorContainer}>
                        <div className={savedSearchStyles.selectorWrapper}>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="transAll" disabled={disabled} checked={transmission === "all"} name={`transmission${props.tagKey}`} onInput={(e) => setTransmission("all")}></input>
                                <label htmlFor="transAll" className={savedSearchStyles.selectorItemLabel}>All</label>
                            </div>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="transAuto" disabled={disabled} checked={transmission === "auto"} name={`transmission${props.tagKey}`} onInput={(e) => setTransmission("auto")}></input>
                                <label htmlFor="transAuto" className={savedSearchStyles.selectorItemLabel}>Auto</label>
                            </div>
                            <div className={savedSearchStyles.selectorItem}>
                                <input className={savedSearchStyles.selectorItemRadio} type="radio" id="transManual" disabled={disabled} checked={transmission === "manual"} name={`transmission${props.tagKey}`} onInput={(e) => setTransmission("manual")}></input>
                                <label htmlFor="transManual" className={savedSearchStyles.selectorItemLabel}>Manual</label>
                            </div>
                        </div>
                        <div className={savedSearchStyles.savedSearchButtonWrapper}>
                            <button className={buttonStyles.drawCancelBorder} onClick={deleteSearch}>Delete Search</button>
                        </div>
                        <div className={savedSearchStyles.savedSearchButtonWrapper}>
                            <Link to={`/SavedResults?search=${props.dbSearchId}&search2=${latestUnix}`}><button className={buttonStyles.drawBorder}>Latest Results</button></Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SavedSearch