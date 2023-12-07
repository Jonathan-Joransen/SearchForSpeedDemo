import planStyles from './Plans.module.css';
import { Link } from 'react-router-dom';

const SubscribeButton = (props) => {

    return (
        <div className={planStyles.buttonWrapper}>
            {props.user?.subscription?.type === "Premium"
                && <h3>Current Plan</h3>}
            {props?.user?.subscription?.type === "Limited" &&
                <>
                    {/* <h5 className={planStyles.freeTrial}>7 day free trial</h5> */}
                    <button className={planStyles.subscribeButton} onClick={props.handleSubmit}>Subscribe</button>
                </>}
            {!props.user?.loggedIn &&
                <Link to="/SignUp">
                    <button className={planStyles.subscribeButton}>Sign Up</button>
                </Link>}
        </div>
    )
}

export default SubscribeButton