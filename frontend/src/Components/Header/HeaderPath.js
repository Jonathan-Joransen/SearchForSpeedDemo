import React, { useState, useRef } from 'react'
import headerPathStyles from './HeaderPath.module.css';
import { Link } from 'react-router-dom';

const HeaderPath = (props) => {
    const [showSubMenu, setShowSubMenu] = useState(false)
    const icon = useRef()

    let toggleSubMenu = () => {
        icon.current.className = icon.current.className === headerPathStyles.arrowUp ? headerPathStyles.arrowDown : headerPathStyles.arrowUp
        return setShowSubMenu(!showSubMenu)
    }

    return (
        <div>
            {
                props.pages.map((page, index) =>
                    page.hasSubpath ?
                        <li key={index}><Link to={page.path}>{page.title}</Link></li>
                        :
                        <ul key={index+15}>
                            <li key={index} className={headerPathStyles.subPathTitle} onClick={toggleSubMenu}>
                            {page.title} <span ref={icon} className={headerPathStyles.arrowDown}></span> 
                            </li>
                            {showSubMenu &&
                                page.subpath.map((subPage, subIndex) =>
                                <li key={subIndex}><Link className={headerPathStyles.subPath} to={subPage.path}>{subPage.title}</Link></li>)
                            }
                        </ul>
                )
            }
        </div>
    )
}

export default HeaderPath