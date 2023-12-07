import { Link } from 'react-router-dom';
import { useRef } from 'react';
import logo from '../../cars/sloth.png'
import HeaderPath from './HeaderPath.js'
import navBarStyle from './NavBar.module.css';
import buttonStyles from '../Profile/DrawBorderButton.module.scss'

let Header = (props) => {
    let navToggleRef = useRef()

    let logOut = () => {
        props.logoutUser()
    }

    const loggedOutPages = props.pages.filter(page => page.title !== "Profile")

    return (
        <div>
            <header className={navBarStyle.header}>
                <div className={navBarStyle.logoWrapper}>
                    <Link to="/">
                        <img src={logo} alt='Fast Cars Logo'></img>
                    </Link>
                    <Link to="/">
                        <h2 className={navBarStyle.logoH2}>searchforspeed.io</h2>
                    </Link>
                </div>
                <input ref={navToggleRef} type="checkbox" id='navToggle' className={navBarStyle.navToggle}></input>
                <nav>
                    <ul>
                        <div className={navBarStyle.navOffLeft}></div>
                        <div className={navBarStyle.navListWrapper}>
                            {props.user.loggedIn ? <HeaderPath  {...props} navToggleRef={navToggleRef}/> : <HeaderPath pages={loggedOutPages} />}
                            {props.user.loggedIn
                                ? <li key={21}><button className={buttonStyles.drawBorder} onClick={logOut}>Log Out</button></li>
                                : <>
                                    <li key={29}><Link to="/SignUp"><button className={buttonStyles.drawBorder}>Sign Up</button></Link></li>
                                    <li key={25}><Link to="/Login"><button className={buttonStyles.drawBorder}>Login</button></Link></li>
                                </>}
                        </div>
                    </ul>
                    <div onClick={() => navToggleRef.current.checked = false} className={navBarStyle.navOffClick}>
                    </div>
                </nav>
                <label htmlFor='navToggle' className={navBarStyle.navToggleLabel}><span></span></label>
            </header>
            <div className={navBarStyle.spacer}></div>
        </div>
    )
}


export default Header