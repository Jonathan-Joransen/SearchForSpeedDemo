import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Title from '../Title/Title.js';
import Search from './Search.js';

let SearchPage = (props) => {
    return (
        <>
            <Header pages={props.pages} logoutUser={props.logoutUser} {...props}/>
            <Title {...props} />
            <Search {...props} />
            <Footer {...props} />
        </>
    )
}


export default SearchPage