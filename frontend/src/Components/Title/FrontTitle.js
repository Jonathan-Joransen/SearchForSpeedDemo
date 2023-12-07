import titleStyles from './Title.module.css';
let Title = (props) => {
    return (
        <div className={titleStyles.titleContainer}>
            <div className={titleStyles.title} >{props.title}</div>
            <div className={titleStyles.subtitle} >{props.subtitle}</div>
        </div>
    )
}


export default Title