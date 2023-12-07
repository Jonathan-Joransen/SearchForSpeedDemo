import profileInfoStyles from './ProfileInfo.module.css'
import buttonStyles from './DrawBorderButton.module.scss'
import React from 'react'

const ProfileInfoItem = ({ itemName, itemValue, editAction }) => {
    return (
        <div className={profileInfoStyles.profileInfoItemWrapper}>
            <div id={itemName} name={itemName} className={profileInfoStyles.profileInfoItem}>{itemName}</div>
            <div id={itemName} name={itemName} className={profileInfoStyles.profileInfoItem}>{itemValue}</div>
            <button id={itemName} name={itemName} className={buttonStyles.drawCancelBorder} value="Edit" onClick={editAction}>Edit</button>
        </div>
    )
}

export default ProfileInfoItem