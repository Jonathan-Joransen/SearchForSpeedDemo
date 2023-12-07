import planStyles from './Plans.module.css';
import { Link } from 'react-router-dom';

const LimitedPlanButton = (props) => {
    return (
        <div className={planStyles.buttonWrapper}>
            {props.user?.subscription?.type === "Limited" && <h3>Current Plan</h3>}
            {!props?.user?.loggedIn &&
                <Link to="/SignUp">
                    <button className={planStyles.subscribeButton} onClick={props.handleSubmit}>Sign Up</button>
                </Link>
            }
        </div>
    )
}

export default LimitedPlanButton