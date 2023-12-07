import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import FrontPage from './FrontPage.js';
import ProtectedRoute from './ProtectedRoute.js';
import ResultsPage from './ResultsPage.js';
import Login from './Login/Login.js';
import LikedCars from './LikedCars/LikedCars.js';
import SignUp from './Login/SignUp.js';
import Privacy from './Privacy/Privacy.js';
import ResetPassword from './Login/ResetPassword.js';
import Profile from './Profile/Profile.js';
import Subscribe from './Subscribe/Subscribe.js';
import Unsubscribe from './Subscribe/Unsubscribe.js';
import Success from './Subscribe/Success.js';
import Times from './Times/Times.js';
import ProfileSub from './Profile/ProfileSub.js';
import SearchPage from './Search/SearchPage.js';
import SavedSearches from './SavedSearches/SavedSearches.js';
import SavedSearchResults from './Results/SavedSearchResults.js';

class Main extends Component {
    constructor(props) {
        super(props);

        this.props.user.loggedIn = window.sessionStorage.getItem("auth")

        // Listen to storage event
        window.addEventListener('storage', (e) => this.storageChanged(e));

        this.storageChanged = this.storageChanged.bind(this);
    }

    storageChanged(e) {
        if (e.key === 'auth') {
            this.setState({ loggedIn: e.newValue })
        }
    }

    render() {
        return (
            <>
                <Routes>
                    <Route key={1} path='/' element={
                        <FrontPage pages={this.props.pages} {...this.props} {...this.props.title} logoutUser={this.props.logoutUser} />
                    } />
                    <Route key={2} path='/Results' element={
                        <ResultsPage {...this.props.title} />
                    } />
                    <Route key={3} path='/Searches' element={
                        <SavedSearches {...this.props} />
                    } />
                    <Route key={6} path='/Profile' element={<ProtectedRoute isAuth={this.props.user.loggedIn} />}>
                        <Route key={6} path='/Profile' element={<Profile {...this.props} />} />
                    </Route>
                    <Route key={7} path='/Profile/Info' element={<ProtectedRoute isAuth={this.props.user.loggedIn} />}>
                        <Route key={7} path='/Profile/Info' element={<Profile {...this.props} />} />
                    </Route>
                    <Route key={8} path='/Profile/Subscription' element={<ProtectedRoute isAuth={this.props.user.loggedIn} />}>
                        <Route key={8} path='/Profile/Subscription' element={<ProfileSub {...this.props} />} />
                    </Route>

                    <Route key={10} path='/Unsubscribe' element={<Unsubscribe {...this.props} />} />
                    <Route key={11} path='/SavedResults' element={
                        <SavedSearchResults {...this.props} />
                    } />
                    <Route key={13} path='/Subscribe' element={
                        <Subscribe {...this.props} />
                    } />
                    <Route key={14} path='/Search' element={
                        <SearchPage pages={this.props.pages} {...this.props} {...this.props.title} logoutUser={this.props.logoutUser}/>
                    } />
                    <Route key={15} path='/Subscribe/Success' element={
                        <Success {...this.props} />
                    } />
                    <Route key={19} path='/SignUp' element={
                        <SignUp {...this.props} />
                    } />
                    <Route key={20} path='/Times' element={
                        <Times {...this.props} />
                    } />
                    <Route key={21} path='/Liked' element={
                        <LikedCars {...this.props} />
                    } />
                    <Route key={22} path='/Login' element={
                        <Login {...this.props} loginUser={this.props.loginUser} />
                    } />
                    <Route key={23} path='/ResetPassword' element={
                        <ResetPassword {...this.props} />
                    } />
                    <Route key={25} path='/Privacy' element={
                        <Privacy />
                    } />
                </Routes>
            </>
        )
    }
}


export default Main