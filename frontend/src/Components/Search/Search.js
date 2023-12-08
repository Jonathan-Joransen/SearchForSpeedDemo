import React, { useState, useRef } from 'react';
import searchStyles from './Search.module.css';
import searchOptionsStyles from './SearchOptions.module.css';
import SearchAdvancedOptions from './SearchAdvancedOptions.js';
import AlwaysOnOptions from './AlwaysOnOptions.js';
import ResultsPage from '../Results/ResultsPage.js';
import axios from 'axios';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';

let Search = (props) => {
    const [showSearchAdvancedOptions, setShowSearchAdvancedOptions] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [loadingResults, setLoadingResults] = useState(false)
    const [showInvalidFields, setShowInvalidFields] = useState(false)
    const [cars, setCars] = useState([])
    const [zip, setZip] = useState("")
    const [dist, setDist] = useState(75)
    const [maxZeroToSixty, setMaxZeroToSixty] = useState(7)
    const [maxPrice, setMaxPrice] = useState(15000)
    const [advOptions, setAdvOptions] = useState({})
    const maxPriceRef = useRef()
    const zipRef = useRef()
    const maxZeroToSixtyRef = useRef()
    const distRef = useRef()
    const loading = useRef()

    let setDetails = (car) => {
        let details = []
        details.push({ key: "0-60", value: `${Number(car.speed).toFixed(1)}s*` })
        details.push({ key: "Price", value: car.price })
        details.push({ key: "Site", value: car.retailer })
        if (car.trim != "unkown") {
            if (car.trim.length > 10) {
                details.push({ key: "Trim", value: `${car.trim.substring(0, 10)}...` })
            }
            else {
                details.push({ key: "Trim", value: car.trim })
            }
        }
        return details;
    }

    let setRequiredFieldsRed = () => {
        zipRef.current.className = searchStyles.searchBarInvalid
        setShowInvalidFields(true)
    }

    let removeRequiredFieldsRed = () => {
        zipRef.current.className = searchStyles.searchBar
        setShowInvalidFields(false)
    }

    let validateFields = () => {
        if (maxPriceRef.current.value === 0 || !maxPriceRef.current.value
            || distRef.current.value === 0 || !distRef.current.value
            || zip === 0 || !zip || typeof (zip) !== 'string' || !props.zipCodes.includes(zip)) {
            setRequiredFieldsRed()
            return false
        }
        removeRequiredFieldsRed()
        return true
    }

    let setSearchParams = () => {
        console.log(advOptions?.bodyType)
        let params = {
            zip: zip,
            radius: dist,
            maxPrice: maxPrice,
            maxZeroToSixty: maxZeroToSixty,
            minYear: advOptions?.minYear,
            maxYear: advOptions?.maxYear,
            minPrice: advOptions?.minPrice,
            minMiles: advOptions?.minMiles,
            maxMiles: advOptions?.maxMiles,
            saleType: advOptions?.saleType,
            saleBy: advOptions?.saleBy,
            bodyType: advOptions?.bodyType,
            transmission: advOptions?.transmission
        }
        Object.keys(params).forEach(key => {
            if (params[key] === undefined) {
                delete params[key];
            }
        });
        return params
    }

    let setLoading = async (isLoading) => {
        await setLoadingResults(isLoading)
        if (isLoading) {
            loading?.current.scrollIntoView({ behavior: 'smooth', block: "center" })
        }
    }

    let runSearch = () => {
        let areFieldsValid = validateFields()
        let searchParams = setSearchParams()
        if (areFieldsValid) {
            setLoading(true)
            axios.post(`${props.config.baseApiUrl}/Cars`, searchParams).then(res => {
                res.data.map((car, idx) => {
                    car.details = setDetails(car)
                    car.placement = idx + 1
                    car.title = `${car.year} ${car.make} ${car.model}`
                })
                setCars(res.data)
                setLoading(false)
                setShowResults(true)
            }).catch(err => {
                console.log(err)
                setCars([])
                setLoading(false)
                setShowResults(true)
            })
        }
    }

    let toggleSearchAdvancedOptions = () => {
        if (showSearchAdvancedOptions) {
            return setShowSearchAdvancedOptions(false)
        }
        setShowSearchAdvancedOptions(true)
    }

    const options = { options: [{ optionName: "0s-4s" }, { optionName: "4s-7s" }, { optionName: "7s-9s" }, { optionName: "9s-14s" }] }
    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        limit: 5
    });
    return (
        <>
            <div className={searchStyles.searchContainer}>
                {showInvalidFields &&
                    <>
                        <div className={searchStyles.searchInvalidTitle}>
                            Please fill out required fields with valid values.
                        </div>
                        <div className={searchStyles.searchInvalidTitle}>
                            You may need to re-enter your Zip
                        </div>
                    </>
                }
                <div ref={props?.searchRef} className={searchStyles.searchWrapper}>
                    <div className={searchOptionsStyles.searchOptionsWrapper}>
                        <label className={searchStyles.searchBarLabel}>Zip Code:</label>
                        <div ref={zipRef} className={searchStyles.searchBar}>
                            <Autocomplete
                                freeSolo
                                id="combo-box-demo"
                                filterOptions={filterOptions}
                                options={[...props.zipCodes]}
                                getOptionLabel={label => label}
                                onChange={(e, value) => setZip(value)}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& > fieldset": {
                                                border: "1px solid black"
                                            }
                                        }
                                    }}
                                    {...params}
                                    placeholder="Zip" />}
                            />
                        </div>
                        <AlwaysOnOptions distRef={distRef} maxPriceRef={maxPriceRef} maxZeroToSixtyRef={maxZeroToSixtyRef}
                            setMaxPrice={setMaxPrice} setDist={setDist} setMaxZeroToSixty={setMaxZeroToSixty} />
                    </div>
                    <div className={searchStyles.searchToggleOptions} onClick={toggleSearchAdvancedOptions}><span>Advanced Options</span></div>
                    <button id="searchButton" className={searchStyles.searchButton} disabled={loadingResults} onClick={runSearch}>Search </button>
                </div>
                {showSearchAdvancedOptions && <SearchAdvancedOptions advOptions={advOptions} setAdvOptions={setAdvOptions} />}
            </div>
            {loadingResults &&
                <div ref={loading} className={searchStyles.loaderContainer}>
                    <div className={searchStyles.loader}></div>
                </div>}
            {showResults &&
                <ResultsPage cars={cars} />
            }
        </>
    )
}

export default Search