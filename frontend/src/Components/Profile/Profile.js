import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import ProfileInfo from './ProfileInfo.js';
import React, {useState} from 'react'
import profileStyles from './Profile.module.css'
let Profile = (props) => {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
            <div className={profileStyles.profileContainer}>
                {showMenu && <div className={profileStyles.menuContainer}>
                    <ul className={profileStyles.menuContainerList}>
                        <li className={profileStyles.menuContainerListItem}>Info</li>
                        <li className={profileStyles.menuContainerListItem}>Subscription</li>
                        <li className={profileStyles.menuContainerListItem}>Search Settings</li>
                    </ul>
                </div>}
                <div className={profileStyles.displayContainer}>
                    <ProfileInfo {...props}/>
                </div>
            </div>
            <Footer {...props}  />
        </div>
    )
}

export default Profile