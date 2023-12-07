import React, { useState, useEffect, useRef } from 'react'
import savedSearchStyles from './SavedSearch.module.css'
import axios from 'axios';
import { CsvTextField } from '../Fields/Inputs.js';
import buttonStyles from '../Profile/DrawBorderButton.module.scss'

const SavedSearch = (props) => {
    const [zip, setZip] = useState("")
    const [dist, setDistance] = useState("")
    const [includeAuctionSale, setIncludeAuctionSale] = useState(false)
    const [saleBy, setSaleBy] = useState("all")
    const [body, setBody] = useState("all")
    const [transmission, setTransmission] = useState("all")
    const [minPrice, setMinPrice] = useState("0")
    const [maxZeroToSixty, setMaxZeroToSixty] = useState(14)
    const [maxPrice, setMaxPrice] = useState("")
    const [minYear, setMinYear] = useState("1996")
    const [maxYear, setMaxYear] = useState("all")
    const [minMileage, setMinMileage] = useState("0")
    const [maxMileage, setMaxMileage] = useState("all")
    const zipFieldStyle = useRef()
    const maxPriceFieldStyle = useRef()
    const distanceFieldStyle = useRef()
    const addButton = useRef()

    useEffect(() => {
        addButton?.current.scrollIntoView({ behavior: 'smooth' })
    },[])

    let handlesetSaleType = () => {

    }

    let setInvalidFieldsRed = () => {
        zipFieldStyle.current.className = savedSearchStyles.savedSearchInvalidInput
        maxPriceFieldStyle.current.className = savedSearchStyles.savedSearchInvalidInput
        distanceFieldStyle.current.className = savedSearchStyles.savedSearchInvalidInput
        setZip(zip+" ")
    }
    let checkIsValidData = () => {
        if(zip && dist && zip.length > 4 && Number(dist) > 0 && Number(dist) < 1000){
            return true
        }
        else {
            setInvalidFieldsRed()
            return false
        }
    }

    let GetSearchId = () => {
        let saleType = includeAuctionSale ? "any" : "classified"
        return `${body}${dist}${maxMileage}${maxPrice}${maxYear}${maxZeroToSixty}${minMileage}${minPrice}${minYear}${saleBy}${saleType}${transmission}${zip}`
    }

    let setFieldLimits = () => {
        const year = new Date().getFullYear() 
        if (Number(minYear) < 1940){
            setMinYear("1940")
        }
        if (Number(maxYear) > year){
            setMaxYear("all")
        }
    }

    let handleSave = (e) => {
        e.preventDefault()
        let isValidData = checkIsValidData()
        if (isValidData){
            setFieldLimits()
            axios.post(`${props.config.baseApiUrl}/User/Search`, {
                email: props.user.email,
                search: {
                    searchId: GetSearchId(),
                    zip: zip,
                    maxZeroToSixty: maxZeroToSixty,
                    bodyType: body === "all" ? "undefined" : body,
                    radius: dist,
                    transmission: transmission === "all" ? "undefined" : transmission,
                    saleBy: saleBy === "all" ? "undefined" : saleBy,
                    saleType: includeAuctionSale ? "any" : "classified",
                    minMiles: minMileage,
                    maxMiles: maxMileage === "all" ? "undefined" : maxMileage,
                    minYear: minYear,
                    maxYear: maxYear === "all" ? "undefined" : maxYear,
                    minPrice: minPrice,
                    maxPrice: maxPrice
                }
            }, {headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }}).then(props.setAddSearch([])).catch((err) => {
                console.error(err)                
                if (err.response.status < 500 && err.response.status >= 400){
                    props.logoutUser()
                }
            })
           props.handleAddSearch() 
        }
    }

    return (
        <div className={savedSearchStyles.savedSearchContainer}>
            <div className={savedSearchStyles.savedSearchWrapper}>
            { zipFieldStyle.current?.className === savedSearchStyles.savedSearchInvalidInput && <div className={savedSearchStyles.searchInvalidTitle}>please fill out required fields with valid values</div> }
                <div className={savedSearchStyles.savedSearchWrapperLeft}>
                <label className={savedSearchStyles.searchItemLabel}>Zip*</label>
                <CsvTextField reference={zipFieldStyle} className={savedSearchStyles.savedSearchInput} disableSeparator={true} maxLength="5" type="number" placeholder="40577..." onChange={(e) => setZip(e)}/>
                <label className={savedSearchStyles.searchItemLabel}>Max 0-60</label>
                <CsvTextField className={savedSearchStyles.savedSearchInput} suffix="s" type="number" maxLength="2" placeholder="0-60 in seconds..." onChange={(e) => setMaxZeroToSixty(e)}/>
                <label className={savedSearchStyles.searchItemLabel}>Distance*</label>
                <CsvTextField reference={distanceFieldStyle} className={savedSearchStyles.savedSearchInput} type="number" maxLength="4" placeholder="100... distance in miles" onChange={(e) => setDistance(e)}/>
                <label className={savedSearchStyles.searchItemLabel}>Price*</label>
                <CsvTextField className={savedSearchStyles.savedSearchInput} prefix="$" type="number" maxLength="8" placeholder="Min. Price" onChange={(e) => setMinPrice(e)}/>
                <CsvTextField reference={maxPriceFieldStyle} className={savedSearchStyles.savedSearchInput} prefix="$" type="number" maxLength="8" placeholder="Max. Price" onChange={(e) => setMaxPrice(e)}/>
                <label className={savedSearchStyles.searchItemLabel}>Year</label>
                <CsvTextField className={savedSearchStyles.savedSearchInput} disableSeparator={true} type="number" maxLength="4" placeholder="Min. Year" onChange={(e) => setMinYear(e)}/>
                <CsvTextField className={savedSearchStyles.savedSearchInput} disableSeparator={true} type="number" maxLength="4"placeholder="Max. Year" onChange={(e) => setMaxYear(e)}/>
                <label className={savedSearchStyles.searchItemLabel}>Mileage</label>
                <CsvTextField className={savedSearchStyles.savedSearchInput} type="number" maxLength="6" placeholder="Min. Mileage" onChange={(e) => setMinMileage(e)}/>
                <CsvTextField className={savedSearchStyles.savedSearchInput} type="number" maxLength="6" placeholder="Max. Mileage" onChange={(e) => setMaxMileage(e)}/>
                </div>
                <div className={savedSearchStyles.savedSearchWrapperRight}>

                <label className={savedSearchStyles.searchItemLabel}>Body Type</label>
                <select onInput={(e) => setBody(e.target.value)} className={savedSearchStyles.savedSearchInput} name="bodyTypes" id="bodyTypes">
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
                        <input className={savedSearchStyles.selectorItemRadio} type="radio"  id="addSaleAll" name="addSale"  onInput={(e) => setSaleBy("all")}></input>
                        <label htmlFor="addSaleAll" className={savedSearchStyles.selectorItemLabel}>All</label>
                    </div>
                    <div className={savedSearchStyles.selectorItem}>
                        <input className={savedSearchStyles.selectorItemRadio} type="radio"  id="addSalePrivate" name="addSale" onInput={(e) => setSaleBy("private")}></input>
                        <label htmlFor="addSalePrivate" className={savedSearchStyles.selectorItemLabel}>Private</label>
                    </div>
                    <div className={savedSearchStyles.selectorItem}>
                        <input className={savedSearchStyles.selectorItemRadio} type="radio" id="addSaleDealer" name="addSale"  onInput={(e) => setSaleBy("dealer")}></input>
                        <label htmlFor="addSaleDealer" className={savedSearchStyles.selectorItemLabel}>Dealer</label>
                    </div>
                </div>
                </div>
                <label className={savedSearchStyles.searchItemLabel}>Include Auctions</label>
                <div className={savedSearchStyles.selectorContainer}>
                    <div className={savedSearchStyles.selectorWrapper}>
                        <div className={savedSearchStyles.selectorItem}>
                            <input className={savedSearchStyles.selectorItemRadio} type="radio" id="addAuction1" name="addAuction" onInput={(e) => setIncludeAuctionSale(true)}></input>
                            <label htmlFor="addAuction1" className={savedSearchStyles.selectorItemLabel}>Yes</label>
                        </div>
                        <div className={savedSearchStyles.selectorItem}>
                            <input className={savedSearchStyles.selectorItemRadio} type="radio" id="addAuction" name="addAuction" onInput={(e) => setIncludeAuctionSale(false)}></input>
                            <label htmlFor="addAuction" className={savedSearchStyles.selectorItemLabel}>No</label>
                        </div>
                    </div>
                </div>
                <label className={savedSearchStyles.searchItemLabel}>Transmission:</label>
                <div className={savedSearchStyles.selectorContainer}>
                    <div className={savedSearchStyles.selectorWrapper}>
                        <div className={savedSearchStyles.selectorItem}>
                            <input className={savedSearchStyles.selectorItemRadio} type="radio" id="addTransAll" name="addTransmission" onInput={(e) => setTransmission("all")}></input>
                            <label htmlFor="addTransAll" className={savedSearchStyles.selectorItemLabel}>All</label>
                        </div>
                        <div className={savedSearchStyles.selectorItem}>
                            <input className={savedSearchStyles.selectorItemRadio} type="radio" id="addTransAuto" name="addTransmission" onInput={(e) => setTransmission("auto")}></input>
                            <label htmlFor="addTransAuto" className={savedSearchStyles.selectorItemLabel}>Auto</label>
                        </div>
                        <div className={savedSearchStyles.selectorItem}>
                            <input className={savedSearchStyles.selectorItemRadio} type="radio" id="addTransManual" name="addTransmission" onInput={(e) => setTransmission("manual")}></input>
                            <label htmlFor="addTransManual" className={savedSearchStyles.selectorItemLabel}>Manual</label>
                        </div>
                    </div>
                    <div ref={addButton} className={savedSearchStyles.savedSearchButtonWrapper}>
                    <button className={buttonStyles.drawBorder} onClick={handleSave}>Save Search</button>
                </div>
                </div>
                </div>

            </div>
        </div>
    )
}

export default SavedSearch