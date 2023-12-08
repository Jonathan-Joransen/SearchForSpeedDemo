import Header from '../Header/Header.js';
import { Link } from 'react-router-dom';
import buttonStyles from './DrawBorderButton.module.scss'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import profileSubStyles from './ProfileSub.module.css';
import CustomizedDialogs from './CancelPopUp.js';

const ProfileSub = (props) => {
    const [date, setDate] = useState(new Date())
    const [cleanDate, setCleanDate] = useState()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setDate(new Date(props.user.subscription.endDate * 1000))
        setCleanDate((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear())
        if (props.user.subscription.endDate?.toLowerCase() === "never"
            && props.user.subscription.type === "Limited") {
            setCleanDate("Never")
        }
    }, [props.user.subscription])

    useEffect(() => {
        axios.get(`${props.config.baseApiUrl}/User?email=${props.user.email}`,
            {
                headers: {
                    "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                }
            }).then((res) => {
                window.sessionStorage.setItem("user", JSON.stringify(res.data.user))
                props.setUser({ ...res.data.user })
            }).catch((err) => {
                console.error(err)
                if (err.response.status < 500 && err.response.status >= 400) {
                    props.logoutUser()
                }
            })
    }, [])

    let handleManageBilling = () => {
        axios.post(`${props.config.baseApiUrl}/StripeCustomerPortal`, {
            email: props.user.email
        }, {
            headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }
        }).then(response => {
            window.open(response.data.url, '_blank', 'noopener,noreferrer')
        })
    }

    let handleCancel = () => {

        axios.delete(`${props.config.baseApiUrl}/User/Subscription/Cancel`, {
            headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
            email: props.user.email
        }).then((res) => {
            window.sessionStorage.setItem("user", JSON.stringify(res.data.user))
            props.setUser({ ...res.data.user })
        }).catch((err) => {
            console.error(err)
            if (err.response.status < 500 && err.response.status >= 400) {
                props.logoutUser()
            }
        })
    }

    return (
        <div>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props} />
            <div className={profileSubStyles.profileSubContainer}>
                <div className={profileSubStyles.profileSubItemHeader}>Subscription</div>
                <div className={profileSubStyles.profileSubWrapper}>
                    <div className={profileSubStyles.profileSubItem}>Type: {props.user.subscription.type}</div>
                    <div className={profileSubStyles.profileSubItem}>Renews: {cleanDate}</div>
                    <div className={profileSubStyles.profileSubItem}>Cost: {props.user.subscription.type === "Premium" ? "$2.99" : "$0"}</div>
                    {props.user.subscription.type !== "Limited" && <button className={buttonStyles.drawBorder} onClick={handleManageBilling}>Manage Billing Info</button>}
                    <Link to="/Subscribe"><button className={buttonStyles.drawBorder}>Change Plan</button></Link>
                    {props.user.subscription.type !== "Limited" && <button className={buttonStyles.drawCancelBorder} onClick={(e) => setOpen(true)}>Cancel</button>}
                    <CustomizedDialogs title="Are you sure?" open={open} handleClose={handleClose}>
                        <div className={profileSubStyles.popupButtonWrapper}>
                            <button className={buttonStyles.drawCancelBorder} onClick={(e) => setOpen(false)}>No</button>
                            <button className={buttonStyles.drawCancelBorder} onClick={handleCancel}>Yes</button>
                        </div>
                    </CustomizedDialogs>
                </div>
            </div>
        </div>
    )
}

export default ProfileSub