import _pages from '../data/pages'
import _title from '../data/title'
import _user from '../data/user'
import _searches from '../data/searches'
import _config from '../data/config'
import _zipCodes from '../data/zipCodes'
import User from '../Model/User.js'
import Subscription from '../Model/Subscription.js'
import { combineReducers } from 'redux';
import Search from '../Model/Search.js';

const pages = (state = _pages) => {
    return state
}

const zipCodes = (state = _zipCodes) => {
    return state
}

const title = (state = _title) => {
    return state
}

const config = (state = _config) => {
    return state
}

let GetSearches = async (email) => {
    return (new Promise(resolve => {
        // axios.get(`${_config.baseApiUrl}/User/Search?email=${email}`).then(response => {
        //     let searches = []
        //     for (let search of response.data) {
        //         let currSearch = search.Item.searchParams.M
        //         searches.push(new Search(currSearch.zip.S, currSearch.maxPrice.S, currSearch.dist.S))
        //     }
            resolve(null)
        // })
    }))
}

const searches = async (state, action) => {
    switch (action.type) {
        case 'SET_SEARCHES':
            let newSearches = await GetSearches(action.email)
            return newSearches
        default:
            return []
    }
}

const user = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                email: action.user.email,
                firstName: action.user.firstName,
                lastName: action.user.lastName,
                subscription: action.user.subscription
            }
        case 'LOGIN_USER':
            return {
                ...state,
                email: action.user.email,
                firstName: action.user.firstName,
                lastName: action.user.lastName,
                subscription: action.user.subscription,
                loggedIn: true
            }
        case 'LOGOUT_USER':
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('auth')
            sessionStorage.removeItem('token')
            return { ...state, loggedIn: false }
        default:
            return { ...JSON.parse(window.sessionStorage.getItem("user")) }
    }
}

const likedCars = async (state, action) => {
    switch (action.type) {
        case 'SET_LIKED_CARS':
            return {
                ...state,
                likedCars: [...action.likedCars]
            }
        default:
            return []
    }
}

const rootReducer = combineReducers({ pages, title, user, searches, zipCodes, config, likedCars });

export default rootReducer