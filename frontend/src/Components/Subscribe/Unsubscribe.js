import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import { Link } from 'react-router-dom';
import checkmark from '../../cars/checked.png'
import successStyle from './SuccessPage.module.css';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

let Unsubscribe = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [successMessage, setSuccessMessage] = useState("Loading...");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const auth = searchParams.get("fromEmail") === "true"
        if (!auth) {
            axios.get(`${props.config.baseApiUrl}/Unsubscribe/Redirect`)
                .then(response => {
                    console.log(response.data)
                    window.location.href = response.data.url
                }).catch(error => console.log(error))
        }
    }, [])

    useEffect(() => {
        const id = searchParams.get("id")
        const searchId = searchParams.get("searchId")

        if (!id || !searchId){
            return setSuccessMessage("Unable to unsubscribe from this search. You can contact us via email or remove the search manually from your saved searches.")
        }

        axios.get(`${props.config.baseApiUrl}/Unsubscribe?id=${id}&searchId=${searchId}`)
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    setSuccessMessage("You Have Successfully Unsubscribed. You will no longer recieve emails for that search.")
                    setShowSuccess(true)
                }
            }).catch((err) => {
                console.error(err)
                if (err.response.status < 550 && err.response.status >= 400) {
                    setSuccessMessage("Unable to unsubscribe from this search. You can contact us via email or remove the search manually from your saved searches.")        
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
                            Create a saved search you want to be emailed for.
                        </h1>
                        <Link to="/Searches"><button className={successStyle.savedSearchesButton}>Saved Searches</button></Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Unsubscribe