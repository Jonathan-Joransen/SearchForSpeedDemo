import { useState, useEffect, useRef } from 'react';
import resultStyles from './TimeSheetResult.module.css';
import heartOutline from '../../cars/heartoutlinetransparent.png'
import heartFilled from '../../cars/heartfilledtransparent.png'
import infoIcn from '../../cars/information.png'

const TimeSheetResult = (props) => {
    let carTitle = `${props.car.year} ${props.car.make} ${props.car.model}`
    const descRef = useRef()
    const [heart, setHeart] = useState(heartOutline)

    useEffect(() => {
        const likedCars = localStorage.getItem('likedCars')
        let currCars = JSON.parse(likedCars) ?? []
        let thisCarInCurrCars = currCars.filter(x =>  
            x.make === props.car.make && 
            x.model === props.car.model && 
            x.year === props.car.year && 
            x.body === props.car.body && 
            x.details === props.car.details
            && x.zeroToSixty === props.car.zeroToSixty
        )
        
        if (thisCarInCurrCars?.length > 0) {
            setHeart(heartFilled)
        }
        else {
            setHeart(heartOutline)
        }
    }, [props.car])

    let updateLikedCars = () => {
        const likedCars = localStorage.getItem('likedCars')
        let currCars = JSON.parse(likedCars)
        // axios.post(`${props.config.baseApiUrl}/LikedCars`, {
        //     email: props.user.email,
        //     likedCars: currCars
        // }, {
        //     headers: {
        //         "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
        //     }
        // }).catch((err) => {
        //     console.error(err)
        // })
    }

    let handleSaveCar = () => {
        let shouldLikeCar = heart === heartOutline
        setHeart(shouldLikeCar ? heartFilled : heartOutline)
        if (shouldLikeCar) {
            const likedCars = localStorage.getItem('likedCars') ?? "[]"
            let currCars = JSON.parse(likedCars)
            currCars.push({ ...props.car, title: carTitle })
            localStorage.setItem("likedCars", JSON.stringify(currCars))
            props.setLikedCars(currCars)
        }
        if (shouldLikeCar === false) {
            const likedCars = localStorage.getItem('likedCars')
            let currCars = JSON.parse(likedCars)
            currCars.pop({ ...props.car, title: carTitle })
            localStorage.setItem("likedCars", JSON.stringify(currCars))
            props.setLikedCars(currCars)
        }
        if (props?.user?.loggedIn) {
            updateLikedCars()
        }
    }

    let toggleDetails = () => {
        let isVisible = descRef.current?.style?.maxHeight === "2.5em" ?? false
        if (isVisible) {
            descRef.current.style.maxHeight = "0em";

        }
        else {
            descRef.current.style.maxHeight = "2.5em";
            descRef.current.style.height = "2.5em";
        }
    }

    return (
        <div className={resultStyles.resultContainer}>
            <div className={resultStyles.resultWrapper}>
                <div className={resultStyles.resultTitle}>{carTitle}</div>
                <div className={resultStyles.resultDetailsAndDesc}>
                    <div className={resultStyles.resultDetail}>0-60: <span>{props.car.zeroToSixty}</span></div>
                    <div className={resultStyles.resultDetail}>1/4 Mile: <span>{props.car.quarterMile}</span></div>
                    <div className={resultStyles.resultDetail}>Body: <span>{props.car.body}</span></div>
                    <button onClick={toggleDetails} className={resultStyles.detailsButton}>
                        <img title="info" src={infoIcn} alt="more info" />
                    </button>
                    <div className={resultStyles.saveButtonWrapper}>
                        <button onClick={handleSaveCar} className={resultStyles.saveButton}>
                            <img title="like" src={heart} alt="like car" />
                        </button>
                    </div>
                </div>
            </div>
            <div ref={descRef} className={resultStyles.resultDetailDesc}>Details: <span>{props.car.details}</span></div>
        </div>
    )
}

export default TimeSheetResult