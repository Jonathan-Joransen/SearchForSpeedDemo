import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import { Link } from 'react-router-dom';
import checkmark from '../../cars/checked.png'
import successStyle from './SuccessPage.module.css';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

let Success = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [successMessage, setSuccessMessage] = useState("Loading...");
    const [showSuccess, setShowSuccess] = useState(true);

    useEffect(() => {
        const sessionId = searchParams.get("session_id")
        axios.get(`${props.config.baseApiUrl}/Subscribe/Success?sessionId=${sessionId}&email=${props.user.email}`)
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    setSuccessMessage("You Have Successfully Subscribed")
                    setShowSuccess(true)
                }
            }).catch((err) => {
                console.error(err)                
                if (err.response.status < 500 && err.response.status >= 400){
                    props.logoutUser()
                }
            })
    }, [])

    return (
        <div>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
            <h1 className={successStyle.successMessage}>
                {successMessage}
            </h1>
            {showSuccess &&
                <div className={successStyle.successContainer}>
                    <img className={successStyle.checkmark} src={checkmark}></img>
                    <div className={successStyle.successWrapper}>
                        <h1 className={successStyle.successMessage}>
                            Get Started By Creating A Saved Search
                        </h1>
                        <Link to="/Searches"><button className={successStyle.savedSearchesButton}>Saved Searches</button></Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Success