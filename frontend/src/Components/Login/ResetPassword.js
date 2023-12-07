import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import resetStyles from './ResetStyles.module.css'

const ResetPassword = (props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [passwordReset, setPasswordReset] = useState(false)
    const [passwordsMismatch, setPasswordsMismatch] = useState(false)
    const [passwordTooShort, setPasswordTooShort] = useState(false)
    const [noValues, setNoValues] = useState(false)
    const confirmPassInputRef = useRef()
    const newPassInputRef = useRef()

    let validatePasswords = () => {
        setNoValues(false)
        setPasswordsMismatch(false)
        setPasswordTooShort(false)
        let areValid = true;

        if (!newPass || !confirmPass) {
            setNoValues(true)
            areValid = false
        }
        if (newPass !== confirmPass) {
            setPasswordsMismatch(true)
            areValid = false
        }
        if (newPass.length < 8) {
            setPasswordTooShort(true)
            areValid = false
        }
        return areValid
    }

    let setFieldsInvalid = () => {
        confirmPassInputRef.current.className = resetStyles.resetInfoInputInvalid
        newPassInputRef.current.className = resetStyles.resetInfoInputInvalid
    }

    let handlePasswordReset = () => {
        let id = searchParams.get('id')
        let email = searchParams.get('email')
        let arePasswordsValid = validatePasswords()
        if (arePasswordsValid) {
            axios.post(`${props.config.baseApiUrl}/User/ResetPassword`, {
                id: id,
                email: email,
                newPassword: newPass
            }).then(res => {
                setPasswordReset(true)
            }).catch(err => {
                console.log(err.response.message)
            })
        }
        else {
            setFieldsInvalid()
        }

    }

    return (
        <div className={resetStyles.resetContainer}>
            <div className={resetStyles.resetWrapper}>
                {passwordReset
                    ? <h1>Your Password Has Been Reset</h1>
                    : <>
                        <div className={resetStyles.resetInfoItem}>Reset Password</div>
                        <input ref={newPassInputRef} type="password" className={resetStyles.resetInfoInput} placeholder="New Password" onInput={(e) => setNewPass(e.target.value)}></input>
                        <input ref={confirmPassInputRef} type="password" className={resetStyles.resetInfoInput} placeholder="Confirm Password" onInput={(e) => setConfirmPass(e.target.value)}></input>
                        {passwordsMismatch && <label className={resetStyles.invalidSubText}>Passwords do not match</label>}
                        {passwordTooShort && <label className={resetStyles.invalidSubText}>Password must be at least 8 characters</label>}
                        {noValues && <label className={resetStyles.invalidSubText}>Please fill out all fields</label>}
                        <div className={resetStyles.resetInfoButtonWrapper}>
                            <button className={resetStyles.resetButton} onClick={handlePasswordReset}>Submit</button>
                        </div>
                    </>}
                {passwordReset &&
                    <div className={resetStyles.resetInfoButtonWrapper}>
                        <Link to="/Login"><button className={resetStyles.resetButton}>Login</button></Link>
                    </div>}

            </div>
        </div>
    )
}

export default ResetPassword