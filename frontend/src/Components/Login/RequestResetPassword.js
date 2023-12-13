import React, { useState, useRef } from 'react';
import loginStyles from './Login.module.css';
import { Link } from 'react-router-dom';

const RequestResetPassword = (props) => {
    const [email, setEmail] = useState("")
    const [emailSending, setEmailSending] = useState(false)
    const [wrongEmail, setWrongEmail] = useState(false)
    const [showInvalid, setShowInvalid] = useState(false)
    const [sentMessage, setSentMessage] = useState("You Should Recieve An Email Shortly With Instructions")
    const emailRef = useRef()

    let validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    let setFieldsInvalid = () => {
        emailRef.current.className = loginStyles.inputInvalid
        setShowInvalid(true)
    }

    let handleForgotPassword = () => {
        let isValidEmail = validateEmail(email)
        if (isValidEmail) {
            setEmailSending(true)
            // axios.post(`${props.config.baseApiUrl}/User/ForgotPassword`, {
            //     email: email
            // }).then(() => {
            //     setShowInvalid(false)
            // }).catch(err => {
            //     console.log(err.response.status)
            //     if (err.response.status === 404) {
            //         setWrongEmail(true)
            //         setEmailSending(false)
            //         emailRef.current.className = loginStyles.inputInvalid
            //     }
            //     else {
            //         setSentMessage(`Unable to send email. Please contact support at ${props.config.supportEmail}`)
            //     }
            // })
        }
        else {
            setFieldsInvalid()
        }
    }

    return (
        <div className={loginStyles.loginContainer}>
            <div className={loginStyles.loginWrapper}>
                {emailSending
                    ? <label className={loginStyles.title}>{sentMessage}</label>
                    : <>
                        <label className={loginStyles.label}>Email</label>
                        <input ref={emailRef} className={loginStyles.input} type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        {showInvalid && <label className={loginStyles.invalidSubText}>Please Enter A Valid Email</label>}
                        {wrongEmail && <label className={loginStyles.invalidSubText}>Account Not Found</label>}
                        <div className={loginStyles.buttonWrapper}>
                            <button className={loginStyles.loginButton} onClick={handleForgotPassword}>Submit</button>
                        {wrongEmail && <Link to="/SignUp"><button className={loginStyles.loginButton}>Sign Up</button></Link>}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default RequestResetPassword