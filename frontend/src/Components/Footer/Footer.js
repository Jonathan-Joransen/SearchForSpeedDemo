import React from 'react'
import footerStyles from './Footer.module.css';

const Footer = (props) => {
  return (
    <div className={footerStyles.footerContainer}>
        <h6 className={footerStyles.footerText}>Contact: {props.config.supportEmail}</h6>
    </div>
  )
}

export default Footer