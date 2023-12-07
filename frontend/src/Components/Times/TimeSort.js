import React, { useRef, useState } from 'react'
import timeSortStyle from './TimeSortStyle.module.css';
import { FancyDropDown } from '../Fields/Dropdown.js';

const TimeSort = (props) => {
    const [sortDirection, setSortDirection] = useState("asc")

    const sortByOptions = [
        {
            val: "zeroToSixty",
            title: "0-60"
        },
        {
            val: "quarterMile",
            title: "1/4 Mile"
        },
        {
            val: "body",
            title: "Body"
        },
        {
            val: "year",
            title: "Year"
        }
    ]
    let isAsc = () => {
        return sortDirection.includes("asc")
    }
    let handleSortBy = (listItem) => {
        let newOrderOfCars = []
        if (sortDirection === `${listItem}asc`) {
            newOrderOfCars = props.cars.sort((a, b) => (a[listItem] < b[listItem]) ? 1 : -1)
            setSortDirection(`${listItem}desc`)
        }
        else {
            newOrderOfCars = props.cars.sort((a, b) => (a[listItem] > b[listItem]) ? 1 : -1)
            setSortDirection(`${listItem}asc`)
        }
        props.setCars([...newOrderOfCars])
    }
    return (
        <div className={timeSortStyle.timeSortContainer}>
                <FancyDropDown isAsc={isAsc} title={"Sort By"} options={sortByOptions} handleSortBy={handleSortBy} />
        </div>
    )
}

export default TimeSort