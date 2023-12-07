import React, { useState, useRef, useEffect } from 'react';
import loginStyles from './Login.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RequestResetPassword from './RequestResetPassword.js';
import GoogleAuthButton from './GoogleAuthButton.js'

const LoginPage = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [credentialsVerified, setCredentialsVerified] = useState(false)
    const [loginInvalid, setLoginInvalid] = useState(false)
    const [userData, setUserData] = useState({})
    const [showForgotPass, setShowForgotPass] = useState(false)
    const emailLabelRef = useRef()
    const emailInputRef = useRef()
    const passwordLabelRef = useRef()
    const passwordInputRef = useRef()
    axios.defaults.withCredentials = true;
    const baseUrl = props.config.baseApiUrl

    let setFieldsInvalid = () => {
        passwordInputRef.current.className = loginStyles.inputInvalid
        passwordLabelRef.current.className = loginStyles.labelInvalid
        emailInputRef.current.className = loginStyles.inputInvalid
        emailLabelRef.current.className = loginStyles.labelInvalid
        setLoginInvalid(true)
    }

    useEffect(() => {
        if (credentialsVerified) {
            props.loginUser(userData)
        }
    }, [credentialsVerified])

    let setUsersLikedCars = async () => {
        return (new Promise(async resolve => {
            axios.get(`${baseUrl}/LikedCars?email=${email}`, {
                headers: {
                    "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                }
            }).then((res) => {
                localStorage.setItem('likedCars', JSON.stringify(res.data))
                resolve([])
            }).catch((err) => {
                console.log("Error", err.message)
                resolve([])
            })
        }))
    }

    let loginUser = () => {
        axios.post(`${baseUrl}/Login`, {
            user: {
                email: email,
                password: password
            }
        }).then(async res => {
            if (res.data.credentialsVerified) {
                setUserData(res.data.user)
                window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
                window.sessionStorage.setItem("auth", res.data.credentialsVerified);
                window.sessionStorage.setItem("token", res.data.token);
                setCredentialsVerified(true)
                await setUsersLikedCars(email)
                window.location.href = res.data.url
            }
            else {
                setFieldsInvalid()
                setCredentialsVerified(false)
            }
        }).catch(err => {
            setFieldsInvalid()
            console.error(err)
        })
    }
    return (
        <>
            {showForgotPass ? <RequestResetPassword {...props} /> :
                <div className={loginStyles.loginContainer}>
                    <div className={loginStyles.loginWrapper}>
                        {loginInvalid &&
                            <div className={loginStyles.invalidLogin}>
                                Email Or Password Was Invalid
                            </div>}
                        <label ref={emailLabelRef} className={loginStyles.label}>Email</label>
                        <input ref={emailInputRef} className={loginStyles.input} type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        <label ref={passwordLabelRef} className={loginStyles.label}>Password</label>
                        <input ref={passwordInputRef} className={loginStyles.input} type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                        <div className={loginStyles.buttonWrapper}>
                            <Link to="/SignUp">
                            <button className={loginStyles.signUpButton} onClick={(e) => props.setShowSignUp(true)}>Sign Up</button>
                                </Link>
                            <button className={loginStyles.loginButton} onClick={loginUser}>Log In</button>
                        </div>
                        <div className={loginStyles.buttonWrapper}>
                            <GoogleAuthButton className={loginStyles.loginButton} imageClassName={loginStyles.googleLogo} {...props} setFieldsInvalid={setFieldsInvalid} buttonText="Sign In With Google" />
                        </div>
                        <div className={loginStyles.searchToggleOptions} onClick={() => setShowForgotPass(true)}><span>Forgot Password</span></div>
                    </div>
                </div>}
        </>
    )
}

export default LoginPage