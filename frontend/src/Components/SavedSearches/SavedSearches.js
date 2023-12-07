import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import savedSearchesStyles from './SavedSearches.module.css'
import SavedSearch from './SavedSearch.js';
import axios from 'axios';
import AddSavedSearch from './AddSavedSearch.js';
import React, { useState, useEffect } from 'react'
import Search from '../../Model/Search.js';
import LoggedOutMessage from './LoggedOutMessage.js';

const SavedSearches = (props) => {

    const [showAddSearch, setShowAddSearch] = useState(false)
    const [buttonValue, setButtonValue] = useState("+")
    const [searches, setSearches] = useState([])
    const [addSearch, setAddSearch] = useState([])

    let GetSearches = async (email) => {
        return (new Promise(resolve => {
            axios.get(`${props.config.baseApiUrl}/User/Search?email=${email}`, {
                headers: {
                    "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                }
            }).then(response => {
                let searches = []
                for (let search of response.data) {
                    let isObjectEmpty = search?.Item?.searchParams?.M === undefined ? true : false;
                    if (!isObjectEmpty) {
                        let currSearch = search.Item.searchParams.M
                        searches.push(new Search(
                            currSearch.zip.S,
                            currSearch.radius.S,
                            currSearch.maxPrice.S,
                            currSearch.maxZeroToSixty.S,
                            search.Item.searchId.S,
                            currSearch?.bodyType?.S === "undefined" ? "all" : currSearch?.bodyType?.S ?? "all",
                            currSearch?.transmission?.S === "undefined" ? "all" : currSearch?.transmission?.S ?? "all",
                            currSearch?.saleBy?.S === "undefined" ? "all" : currSearch?.saleBy?.S ?? "all",
                            currSearch?.saleType?.S === "auction",
                            currSearch?.minMileage?.S ?? 0,
                            currSearch?.maxMileage?.S ?? "all",
                            currSearch?.minYear?.S ?? "all",
                            currSearch?.maxYear?.S === "undefined" ? "all" : currSearch?.maxYear?.S ?? new Date().getFullYear(),
                            currSearch?.minPrice?.S ?? "all",
                        ))
                    }
                }
                resolve(searches)
            }).catch((err) => {
                console.error(err)
                if (err.response.status < 500 && err.response.status >= 400) {
                    props.logoutUser()
                }
            })
        }))
    }

    useEffect(async () => {
        if (props.user.loggedIn) {
            let newSearch = await GetSearches(props.user.email)
            setSearches([...newSearch])
        }
    }, [addSearch])

    let handleAddSearch = () => {
        buttonValue === "+" ? setButtonValue("-") : setButtonValue("+")
        return setShowAddSearch(!showAddSearch)
    }

    return (
        <div>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
            <div className={savedSearchesStyles.savedSearchBody}>
            <div className={savedSearchesStyles.savedSearchWrapper}>
                <div className={savedSearchesStyles.searchTitle}>Saved Searches</div>
                <div className={savedSearchesStyles.searchSubTitle}>We will constanly check the web for cars matching your searches and email you the results.</div>
            </div>
                {!props.user.loggedIn ? <LoggedOutMessage />
                    : <>
                        {
                            searches.length > 0
                                ? searches.map((search, idx) => <SavedSearch config={props.config} key={idx} tagKey={idx} email={props.user.email} setAddSearch={setAddSearch} {...search} />)
                                : <div className={savedSearchesStyles.noSearchesMessage}>No Searches, Click the + button to add a new one</div>
                        }
                        <div className={savedSearchesStyles.addButtonWrapper}>
                            <button className={savedSearchesStyles.addButton} onClick={handleAddSearch}>{buttonValue}</button>
                        </div>
                        {showAddSearch && <AddSavedSearch handleAddSearch={handleAddSearch} setAddSearch={setAddSearch} {...props} />}
                    </>}
            </div>
            <Footer {...props} />
        </div>
    )
}

export default SavedSearches