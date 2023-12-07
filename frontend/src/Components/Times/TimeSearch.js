import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import timeStyles from './Times.module.css';
import { AutoFillDropdown } from '../Fields/Inputs.js';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Fields/Dropdown.js';

const TimeSearch = (props) => {
    const [border, setBorder] = useState("none")
    const [make, setMake] = useState()
    const [makes, setMakes] = useState([])
    const [model, setModel] = useState()
    const [models, setModels] = useState([])
    const [years, setYears] = useState([])
    const [year, setYear] = useState("")
    const errorRef = useRef()
    const modelRef = useRef()
    const [searchParams, setSearchParams] = useSearchParams();

    let createYearOption = (year, selected = false) => {
        if (selected) {
            return { val: year, selected, title: String(year) }
        }
        return { val: year, title: String(year) }
    }

    useEffect(() => {
        axios.get(`${props.config.baseApiUrl}/Makes`).then((res) => {
            setMakes(res.data.map(x => x.make))
        })
    }, [])

    useEffect(() => {
        let makeParam = searchParams.get("make")
        let modelParam = searchParams.get("model")
        let yearParam = searchParams.get("year")

        axios
            .post(`${props.config.baseApiUrl}/Times`, {
                make: makeParam,
                model: modelParam,
                year: yearParam
            })
            .then(res => {
                if (res.data.length > 0) {
                    updateModels(makeParam)
                    updateYears(makeParam, modelParam, yearParam)
                    setFieldsValid()
                    setMake(makeParam)
                    setModel(modelParam)
                    props.setCars(res.data)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    let updateMake = (currMake) => {
        if (currMake === null) {
            setSearchParams("")
            return
        }
        setMake(currMake)
        setSearchParams(`make=${currMake}`)
        updateModels(currMake)
    }

    let updateModel = (currModel) => {
        if (currModel === null) {
            setSearchParams(`make=${make}`)
            return
        }
        setModel(currModel)
        setSearchParams(`make=${make}&model=${currModel}`)
        updateYears(make, currModel)
    }

    let updateYear = (currYear) => {
        setYear(currYear)
        if (currYear !== null && currYear !== "All") {
            setSearchParams(`make=${make}&model=${model}&year=${currYear}`)
        }
        if (currYear !== null && currYear === "All") {
            setSearchParams(`make=${make}&model=${model}`)
        }
    }

    let updateModels = (currMake) => {
        if (!currMake) {
            return
        }
        setModel("")

        axios.get(`${props.config.baseApiUrl}/Models?make=${currMake}`).then((res) => {
            setModels(res.data.map(x => {
                let modArr = x.model.split(" ")
                let model = ""
                for (var mod of modArr) {
                    if (mod.length < 4) {
                        model += mod.toUpperCase() + " "
                    }
                    else {
                        model += mod[0].toUpperCase() + mod.substring(1, mod.length) + " "
                    }
                }
                return model.trim()
            }))
        })
    }

    let updateYears = (currMake, currModel, currYear) => {
        axios.get(`${props.config.baseApiUrl}/Years?model=${currModel}&make=${currMake}`).then((res) => {
            let years = res.data.map(x => {
                if (currYear !== null && Number(currYear) === x.year) {
                    return createYearOption(x.year, true)
                }
                return createYearOption(x.year)
            })
            setYears([createYearOption("All"), ...years])
        })
    }

    let areFieldsValid = () => {
        if (makes.includes(make) && models.includes(model)) {
            return true
        }
        return false
    }

    let setFieldsValid = () => {
        setBorder("none")
        errorRef.current.className = timeStyles.timeSearchContainer
    }

    let setFieldsInvalid = () => {
        setBorder("1px solid red")
        errorRef.current.className = timeStyles.timeSearchContainerInvalid
    }

    let handleTimeSearch = () => {
        let fieldsAreValid = areFieldsValid()
        if (!fieldsAreValid) {
            return setFieldsInvalid()
        }
        axios
            .post(`${props.config.baseApiUrl}/Times`, {
                make: make,
                model: model,
                year: year
            })
            .then(res => {
                setFieldsValid()
                props.setCars(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div ref={errorRef} className={timeStyles.timeSearchContainer}>
            <h1 className={timeStyles.landingHeader}>Enter Car</h1>
            <div className={timeStyles.timeSearchWrapper}>
                <AutoFillDropdown
                    val={make ?? ""}
                    border={border}
                    options={[...makes]}
                    onChange={(e, value) => updateMake(value)}
                    placeholder="Enter Make..." />
                <AutoFillDropdown
                    val={model ?? ""}
                    border={border}
                    options={[...models]}
                    onChange={(e, value) => updateModel(value)}
                    placeholder="Enter Model..." />
                <Dropdown className={timeStyles.alwaysOnDropdown} name="year" options={years} onInput={(e) => updateYear(e.target.value)}></Dropdown>
            </div>
            <div className={timeStyles.buttonContainer}>
                <button className={timeStyles.searchButton} onClick={handleTimeSearch}>Search Times</button>
            </div>
        </div>

    )
}

export default TimeSearch