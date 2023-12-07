import resultStyles from './Result.module.css';

const PageNavigation = ({ setCarIdxArr, carIdxArr, cars, resultsRef }) => {

    let handleLoadMore = () => {
        let endCar = carIdxArr[1]
        if (cars.length - endCar > 25) {
            endCar = carIdxArr[1] + 25
            return setCarIdxArr([0, endCar])
        }
        return setCarIdxArr([0, cars.length])
    }

    let handleBackToTop = () => {
        resultsRef?.current.scrollIntoView({ behavior: 'smooth', block: "start" })
    }

    return (
        <>
            <div className={resultStyles.pageNavigationContainer}>
                {carIdxArr[1] !== cars.length && <button className={resultStyles.pageNavigation} onClick={handleLoadMore}>Load More</button>}
                <button className={resultStyles.pageNavigation} onClick={handleBackToTop}>Back To Top</button>
            </div>
        </>
    )
}

export default PageNavigation