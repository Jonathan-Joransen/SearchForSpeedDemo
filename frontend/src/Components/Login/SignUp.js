import loginStyles from './Login.module.css';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../Header/Header.js'

let SignUp = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userExists, setUserExists] = useState(false)
    const [signUpInvalid, setSignUpInvalid] = useState(false)
    const [passwordInvalid, setPasswordInvalid] = useState(false)
    const emailRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const passwordRef = useRef()
    const baseUrl = props.config.baseApiUrl

    let validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    let AreFieldsValid = () => {
        if (!email, !password, !firstName, !lastName) {
            return false
        }
        if (!validateEmail(email)) {
            return false
        }
        if (password.length < 8) {
            setPasswordInvalid(true)
            return false
        }
        setPasswordInvalid(false)
        return true;
    }

    let setFieldsInvalid = () => {
        firstNameRef.current.className = loginStyles.inputInvalid
        lastNameRef.current.className = loginStyles.inputInvalid
        emailRef.current.className = loginStyles.inputInvalid
        passwordRef.current.className = loginStyles.inputInvalid
        setSignUpInvalid(true)
    }

    let registerUser = () => {
        let areFieldsValid = AreFieldsValid()
        if (areFieldsValid) {
            axios.post(`${baseUrl}/Register`, {
                user: {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    subscription: { ...props.user.subscription }
                }
            }).then(res => {
                if (res.data.userExists) {
                    setUserExists(true)
                }
                else {
                    setUserExists(false)
                    props.setShowSignUp(false)
                }
            })
        }
        else {
            setFieldsInvalid()
        }
    }

    return (
        <>
            < Header {...props} />
            <div className={loginStyles.loginContainer}>
                <div className={loginStyles.loginWrapper}>
                    {userExists && <div className={loginStyles.accountExists}>Account Already Exists</div>}
                    {signUpInvalid && <div className={loginStyles.signUpInvalid}>Please fill out all fields with valid values</div>}
                    {passwordInvalid && <div className={loginStyles.signUpInvalid}>Password needs to be at least 8 characters</div>}
                    <label className={loginStyles.label} >First Name</label>
                    <input ref={firstNameRef} className={loginStyles.input} maxLength="30" type="text" name="firstName" id="firstName" onChange={(e) => setFirstName(e.target.value)} />
                    <label className={loginStyles.label}>Last Name</label>
                    <input ref={lastNameRef} className={loginStyles.input} maxLength="30" type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)} />
                    <label className={loginStyles.label}>Email</label>
                    <input ref={emailRef} className={loginStyles.input} maxLength="30" type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    <label className={loginStyles.label}>Password</label>
                    <input ref={passwordRef} className={loginStyles.input} maxLength="50" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    <div className={loginStyles.buttonWrapper}>
                        <button className={loginStyles.signUpButton} onClick={registerUser}>Sign Up</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SignUp