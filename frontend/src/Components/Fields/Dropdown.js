import { useState, useRef } from "react";
import dropdownStyles from './Dropdown.module.css';
import downArrow from '../../cars/chevron.png';

export const Dropdown = (props) => {
    return (
        <select ref={props?.reference} onInput={props.onInput} className={props.className} name={props.name} id={props.id}>
            {props.options.map((opt, idx) => {
                return opt?.selected
                    ? <option key={idx} selected value={opt.val}>{opt.title}</option>
                    : <option key={idx} value={opt.val}>{opt.title}</option>
            })}
        </select>
    )
}

export const FancyDropDown = (props) => {
    const [title, setTitle] = useState(props.title)
    const ulRef = useRef()
    const iconRef = useRef()
    let toggleList = () => {
        ulRef.current.style.visibility === "hidden"
            ? ulRef.current.style.visibility = "visible"
            : ulRef.current.style.visibility = "hidden"
    }

    let handleListClick = (listItem, listItemName) => {
        setTitle(`${props.title}: ${listItemName}`)
        ulRef.current.style.visibility = "hidden"
        props.handleSortBy(listItem)
        let isAsc = props.isAsc()
        isAsc
        ? iconRef.current.style.transform = "rotate(0deg)" 
        : iconRef.current.style.transform = "rotate(180deg)"
    }

    return (
        <>
            <div onClick={toggleList} className={dropdownStyles.fancyDropdownTitleWrapper}>
                <div className={dropdownStyles.fancyDropdownTitle}>
                    {title}
                </div>
                <img ref={iconRef} src={downArrow} className={dropdownStyles.fancyDropdownTitleIcon} />
            </div>
            <ul ref={ulRef} className={dropdownStyles.fancyDropdownList}>
                {props.options.map((opt, idx) =>
                    <li onClick={() => handleListClick(opt.val, opt.title)} className={dropdownStyles.fancyDropdownListItem} key={idx} id={opt.val}>
                        <span>{opt.title}</span>
                    </li>
                )}
            </ul>
        </>
    )
}