import React, { useEffect, useState } from 'react'
import Header from '../Header/Header.js';
import Plans from './Plans.js'
import subStyles from './Subscribe.module.css';
import Footer from '../Footer/Footer.js';
import { useSearchParams } from 'react-router-dom';
import SubscriptionFailed from './SubscriptionFailed.js'

const Subscribe = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showSubFailed, setShowSubFailed] = useState(false);

    useEffect(() => {
        const subscriptionFailed = searchParams.get("failed")
        if (subscriptionFailed === "true") {
            setShowSubFailed(true)
        }
    }, [])

    return (
        <>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
                {showSubFailed && <SubscriptionFailed />}
            <div className={subStyles.subBody}>
                <Plans {...props} />
            </div>
            <Footer {...props} />
        </>
    )
}

export default Subscribe