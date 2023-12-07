import React, { useState } from 'react';
import profileInfoStyles from './ProfileInfo.module.css'
import ProfileInfoItem from './ProfileInfoItem.js'
import EditInfoItem from './EditInfoItem.js'
import axios from 'axios';

const ProfileInfo = (props) => {
    const [showEditPassword, setShowEditPassword] = useState(false)
    const [showEditEmail, setShowEditEmail] = useState(false)
    const [showEditName, setShowEditName] = useState(false)
    const [newEmail, setNewEmail] = useState(props.user.email)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newFirstName, setNewFirstName] = useState(props.user.firstName)
    const [newLastName, setNewLastName] = useState(props.user.lastName)

    let toggleShowEditPassword = () => {
        setShowEditPassword(!showEditPassword)
    }

    let toggleShowEditEmail = () => {
        setShowEditEmail(!showEditEmail)
    }

    let toggleShowEditName = () => {
        setShowEditName(!showEditName)
    }

    let updatePassword = () => {
        axios.post(`${props.config.baseApiUrl}/Update`, {
            user: {
                email: props.user.email,
                password: password, 
                newPassword: newPassword 
            }
        }, {headers: {
            "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
        }}).catch((err) => {
            console.error(err)                
            if (err.response.status < 500 && err.response.status >= 400){
                props.logoutUser()
            }
        })
    }

    let updateEmail = () => {
            axios.post(`${props.config.baseApiUrl}/Update`, {
                user: {
                    ...props.user, 
                    newEmail: newEmail 
                }
            }, {headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }}).then(res => {
                props.setUser(res.data.user)
            }).catch((err) => {
                console.error(err)                
                if (err.response.status < 500 && err.response.status >= 400){
                    props.logoutUser()
                }
            })
    }

    let updateName = () => {
            axios.post(`${props.config.baseApiUrl}/Update`, {
                user: {
                    ...props.user, 
                    newFirstName: newFirstName, 
                    newLastName: newLastName 
                }
            }, {headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }}).then(res => {
                props.setUser(
                    {
                        ...props.user,
                         firstName: res.data.firstName,
                         lastName: res.data.lastName
                    })
            }).catch((err) => {
                console.error(err)                
                if (err.response.status < 500 && err.response.status >= 400){
                    props.logoutUser()
                }
            })
    }

    return (
        <div className={profileInfoStyles.profileInfoContainer}>
            <div className={profileInfoStyles.profileInfoWrapper}>
            <div className={profileInfoStyles.profileInfoItemHeader}>Info</div>
                <div className={profileInfoStyles.profileInfoItemTitle}>Personal Information</div>
                <div className={profileInfoStyles.profileInfoField}>
                    {
                        !showEditName ? <ProfileInfoItem itemName="Name" itemValue={`${props.user.firstName} ${props.user.lastName}`} editAction={toggleShowEditName} /> :
                            <EditInfoItem type="text" itemName="Name" input1={props.user.firstName} input2={props.user.lastName} 
                            onInput1={e => setNewFirstName(e.target.value)} onInput2={e => setNewLastName(e.target.value)} saveEvent={updateName} stopShowingEdit={toggleShowEditName} />
                    }
                </div>
                <div className={profileInfoStyles.profileInfoItemTitle}>Login Information</div>
                <div className={profileInfoStyles.profileInfoField}>
                    {
                        !showEditEmail ? <ProfileInfoItem itemName="Email" itemValue={props.user.email} editAction={toggleShowEditEmail} /> :
                            <EditInfoItem type="text" itemName="Email" input1={props.user.email} input2="New Email" 
                            stopShowingEdit={toggleShowEditEmail} saveEvent={updateEmail} onInput2={e => setNewEmail(e.target.value)}/>
                    }
                    {
                        !showEditPassword ? <ProfileInfoItem itemName="Password" itemValue="********" editAction={toggleShowEditPassword} /> :
                            <EditInfoItem type="password" itemName="Password" input1="Current Password" input2="New Password" 
                            onInput1={e => setPassword(e.target.value)} onInput2={e => setNewPassword(e.target.value)} saveEvent={updatePassword} stopShowingEdit={toggleShowEditPassword} />
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo