import React from 'react';
import landStyles from './Landing.module.css';
import img from '../../cars/challenger.png';
import ebay from '../../cars/ebay.png';
import carvana from '../../cars/carvana.png';
import carscom from '../../cars/carscom.png';
import truecar from '../../cars/truecar.png';
import carsoup from '../../cars/carsoup.png';
import carsdirect from '../../cars/carsdirect.png';

const Landing = (props) => {
    let goToSearch = () => {
        props.searchRef?.current.scrollIntoView({ behavior: 'smooth', block: "center" })
    }

    return (
        <div className={landStyles.landingContainer}>
            <div className={landStyles.landingWrapper}>
                <h1 className={landStyles.landingHeader}>Find The Top <br /> 0-60 Cars Near You</h1>
                <h2 className={landStyles.landingSubtitle}>We search thousands of cars for sale in your <br /> area and only show you the fastest ones.<br /> Allowing you to find faster cars faster.</h2>
                <img className={landStyles.landingImage} src={img} />
                <div className={landStyles.retailerContainer}>
                    <h4 className={landStyles.retailerSubtitle}>&nbsp;</h4>
                    <div className={landStyles.retailerWrapper}>
                        <img className={landStyles.retailerImage} src={ebay} />
                        <img className={landStyles.retailerImage} src={carvana} />
                        <img className={landStyles.retailerImage} src={carscom} />
                        <img className={landStyles.retailerImage} src={truecar} />
                        <img className={landStyles.retailerImage} src={carsdirect} />
                        <img className={landStyles.retailerImage} src={carsoup} />

                    </div>
                </div>
            </div>
            <div className={landStyles.buttonWrapper}>
            <button id="goToSearch" className={landStyles.goToSearchButton} onClick={goToSearch}>Start Searching</button>
        </div>
        </div>
    )
}

export default Landing