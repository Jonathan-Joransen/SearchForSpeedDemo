import subStyles from './Subscribe.module.css';

const SubscriptionFailed = () => {
  return (
    <div className={subStyles.subscriptionFailedContainer}>
      <h4 className={subStyles.subscriptionFailedHeader}>
        Your subscription failed to go through.
      </h4>
      <h5 className={subStyles.subscriptionFailedSubHeader}>
        Either you have canceled the transaction or there was an issue with the payment method. 
        If you are experience issues please reach out to us via our contact page.
      </h5>
    </div>

  )
}

export default SubscriptionFailed