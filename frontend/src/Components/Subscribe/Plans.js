import React from 'react';
import  { useNavigate } from 'react-router-dom';
import planStyles from './Plans.module.css';
import Plan from './Plan.js';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';

const Plans = (props) => {
    let navigate = useNavigate();
    
    let limitedSubmit = () => {
        navigate("/SignUp");
    }
    const stripePromise = loadStripe(
        props.config.STRIPE_API_KEY
    );

    let premiumSubmit = () => {
        axios.post(`${props.config.baseApiUrl}/Subscribe`, {
            priceId: props.config.premiumProductId,
            email: props.user.email
        }).then(async response => {
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({ sessionId: response.data.id });
        })
    }
    const limitedPlan = {
        price: "$0",
        title: "Limited",
        details: [
            {name: "0-60 Sorted Searches"},
            {name: "Coming Soon: 1 Saved Search"}
        ]
    }
    const premiumPlan = {
        price: "$2.99",
        oldPrice: "$7.99",
        title: "Premium",
        details: [
            {name: "Unlimited 0-60 Sorted Searches"},
            {name: "Unlimited Saved Searches"},
            {name: "Email Alerts For New Cars In Saved Searches"}
        ]
    }
  return (
    <div className={planStyles.planContainer}>
        <Plan handleSubmit={limitedSubmit} plan={limitedPlan} {...props}/>
        <Plan handleSubmit={premiumSubmit} plan={premiumPlan} {...props}/>
    </div>
  )
}

export default Plans