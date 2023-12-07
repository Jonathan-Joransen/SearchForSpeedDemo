import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import TimeSearch from './TimeSearch.js';
import timeStyles from './Times.module.css';
import SearchPageLink from './SearchPageLink.js';
import TimeResult from './TimeResult.js';
import TimeSheetResult from './TimeSheetResult.js';
import TimeSort from './TimeSort.js';
import TimeResultSpreedSheet from './TimeResultSpreedSheet.js';
import spreedSheetIcn from '../../cars/tablet.png';
import fullListViewIcn from '../../cars/fulllistview2.png';

const Times = (props) => {
    const [cars, setCars] = useState([])
    const [showCars, setShowCars] = useState(cars.length > 0)
    const [showSimpleView, setShowSimpleView] = useState(true)
    const listViewRef = useRef(timeStyles.timeResultViewButton)
    const sheetViewRef = useRef(timeStyles.timeResultViewButton)

    useEffect(() => {
        if (cars.length > 0) {
            setShowCars(true)
        }
        else {
            setShowCars(false)
        }
    }, [cars])

    let setListView = () => {
        setShowSimpleView(true)
        listViewRef.current.className = timeStyles.timeResultViewActive
        sheetViewRef.current.className = timeStyles.timeResultViewButton
    }

    let setSheetView = () => {
        setShowSimpleView(false)
        sheetViewRef.current.className = timeStyles.timeResultViewActive
        listViewRef.current.className = timeStyles.timeResultViewButton
    }


    return (
        <>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
            <div className={timeStyles.pageBackground}>
                <div className={timeStyles.tableContainer}>
                    <TimeSearch {...props} setCars={setCars} />
                    <SearchPageLink />

                    {showCars && <div className={timeStyles.tableWrapper}>
                        <div className={timeStyles.timeResultControls}>
                            <TimeSort cars={cars} setCars={setCars} />
                            <button ref={listViewRef} title="simple view" className={timeStyles.timeResultViewActive} onClick={setListView}><img alt="simple view" src={fullListViewIcn}></img></button>
                            <button ref={sheetViewRef} title="compact view" className={timeStyles.timeResultViewButton} onClick={setSheetView}><img alt="compact view" src={spreedSheetIcn}></img></button>
                        </div>
                        {showSimpleView
                            ? cars.map((car, idx) => {
                                return <TimeResult {...props} key={idx} car={car} />
                            })
                            : <TimeResultSpreedSheet>
                                {cars.map((car, idx) => {
                                return <TimeSheetResult {...props} key={idx} car={car} />
                            })}
                            </TimeResultSpreedSheet>
                            }
                    </div>}
                </div>
            </div>
            <Footer {...props} />
        </>
    )
}


export default Times