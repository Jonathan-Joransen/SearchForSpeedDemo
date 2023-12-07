import Main from './Components/Main'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './redux/actions'

function mapStateToProps(state) {
    return {
        pages: state.pages,
        title: state.title,
        user: state.user,
        searches: state.searches,
        zipCodes: state.zipCodes,
        config: state.config,
        likedCars: state.likedCars
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App
