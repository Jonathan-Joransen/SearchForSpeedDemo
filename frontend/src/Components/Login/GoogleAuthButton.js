import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import googleLogo from '../../cars/googlelogo.png'
import axios from 'axios'

const GoogleAuthButton = (props) => {
    const [credentialsVerified, setCredentialsVerified] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (credentialsVerified) {
            props.loginUser(userData)
        }
    }, [credentialsVerified])

    let googleLoginSuccess = (res) => {
        console.log("success")
        console.log(res)
        let email = res.uv.gw
        let firstName = res.uv.xZ
        let lastName = res.uv.LX
        axios.post(`${props.config.baseApiUrl}/Google/Login`, {
            user: {
                email: email,
                firstName: firstName,
                lastName: lastName
            }
        }).then(res => {
            if (res.data.credentialsVerified) {
                setUserData(res.data.user)
                window.sessionStorage.setItem("user", JSON.stringify(res.data.user));
                window.sessionStorage.setItem("auth", res.data.credentialsVerified);
                window.sessionStorage.setItem("token", res.data.token);
                setCredentialsVerified(true)
                window.location.href = res.data.url
            }
            else {
                props.setFieldsInvalid()
                setCredentialsVerified(false)
            }
        }).catch(err => {
            props.setFieldsInvalid()
            console.error(err)
        })

    }

    let googleLoginFailure = (res) => {
        console.log("failed", res)
        props.googleError()
    }
    return (
        <GoogleLogin
            clientId={props.config.googleAuthClientId}
            buttonText={props.buttonText}
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginFailure}
            cookiePolicy={'single_host_origin'}
            // className={loginStyles.loginButton}
            render={renderProps => (
                <button className={props.className} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                    <img className={props.imageClassName} src={googleLogo}></img>
                    {props.buttonText}
                    </button>
              )}
            uxMode="popup"
        />
    )
}

export default GoogleAuthButton