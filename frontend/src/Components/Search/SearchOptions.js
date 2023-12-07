import searchStyles from './SearchOptions.module.css';
import SearchOption from './SearchOption.js';

let SearchOptions = (props) => {
    return (
        <div className={searchStyles.searchOptionsContainer}>
            {props.options.map((opt, index) => <SearchOption key={index} {...opt} />)}
        </div>
    )
}


export default SearchOptions

