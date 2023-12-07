import React, { useState } from 'react'
import SubscribeButton from './SubscribeButton';
import planStyles from './Plans.module.css';
import LimitedPlanButton from './LimitedPlanButton';

const Plan = (props) => {

    return (
        <div className={planStyles.plan}>
            <div className={planStyles.planTitle}>{props.plan.title}</div>
            <div className={planStyles.planPrice}><span>{props.plan?.oldPrice}</span> {props.plan.price}</div>
            <h3 className={planStyles.planDetailsLabel}>What's Included:</h3>
            <ul className={planStyles.planDetails}>
                {props.plan.details.map((detail, idx) => <li className={planStyles.detailsItem} key={idx}>{detail.name}</li>)}
            </ul>
            {props.plan.title === "Premium" && <SubscribeButton {...props} handleSubmit={props.handleSubmit} />}
            {props.plan.title === "Limited" && <LimitedPlanButton {...props} handleSubmit={props.handleSubmit} />}
        </div>
    )
}

export default Plan