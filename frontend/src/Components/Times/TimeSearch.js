import React, { useState, useEffect, useRef } from 'react'
import timeStyles from './Times.module.css';
import { AutoFillDropdown } from '../Fields/Inputs.js';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../Fields/Dropdown.js';
import StaticCars from '../../data/cars';

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
        setMakes([...new Set(StaticCars.map(x => x["make"]))])
    }, [])

    useEffect(() => {
        let makeParam = searchParams.get("make")
        let modelParam = searchParams.get("model")
        let yearParam = searchParams.get("year")
        let data = []
        if (data.length > 0) {
            updateModels(makeParam)
            updateYears(makeParam, modelParam, yearParam)
            setFieldsValid()
            setMake(makeParam)
            setModel(modelParam)
            props.setCars(data)
        }
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
        setModels([...new Set(StaticCars.filter(x => x["make"].toLowerCase() === currMake.toLowerCase()).map(x => {
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
        }))])
    }

    let updateYears = (currMake, currModel, currYear) => {
        let years = [];
        let modelsOfCar = StaticCars.filter(x => x.model.toLowerCase() === currModel.toLowerCase())
        for(let i = 0; i < modelsOfCar.length; i++) {
            let x = modelsOfCar[i]
            let options = null;
            if (currYear !== null && Number(currYear) === x.year) {
                options = createYearOption(x.year, true)
            } else {
                options = createYearOption(x.year)
            }
            if(years.filter(a => a.val == x.year).length === 0) {
                years.push(options)
            }
        }
        setYears([createYearOption("All"), ...years])
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
        } else {
            setFieldsValid()
        }

        let carTimes = null;
        if (!year || year.toLowerCase() === "all") {
            carTimes = StaticCars.filter(x => x.model.toLowerCase() === model.toLowerCase());
        }
        else {
            carTimes = StaticCars.filter(x => x.model.toLowerCase() === model.toLowerCase() && String(x.year) === year);
        }

        props.setCars(carTimes)
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