import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import FrontTitle from './Title/FrontTitle.js';
import Landing from './Landing/Landing.js';
import Search from './Search/Search.js';
import { useRef } from 'react';
import frontPageStyles from './FrontPage.module.css';

let FrontPage = (props) => {
    let searchRef = useRef()

    return (
        <>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
            <Landing {...props} searchRef={searchRef} />
            <FrontTitle {...props}/>
            <div className={frontPageStyles.searchContainer}>
                <Search {...props}  searchRef={searchRef}/>
            </div>
            <Footer {...props} />
        </>
    )
}


export default FrontPage

