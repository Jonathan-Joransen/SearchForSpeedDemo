import SignUp from './SignUp.js';
import LoginPage from './LoginPage.js';
import {useState} from 'react';
import Header from '../Header/Header.js'

let Login = (props) => {
   const [showSignUp, setShowSignUp] = useState(false)
    return (
        <div >
            < Header {...props}/>
            {showSignUp ? <SignUp {...props} setShowSignUp={setShowSignUp} /> :
                <LoginPage {...props} setShowSignUp={setShowSignUp}/>
            }
        </div>
    )
}

export default Login