import { useState, useEffect } from 'react';
import resultStyles from './TimeResult.module.css';
import heartOutline from '../../cars/heartoutlinetransparent.png'
import heartFilled from '../../cars/heartfilledtransparent.png'
import axios from 'axios';

let TimeResult = (props) => {
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
        axios.post(`${props.config.baseApiUrl}/LikedCars`, {
            email: props.user.email,
            likedCars: currCars
        }, {
            headers: {
                "authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }
        }).catch((err) => {
            console.error(err)
        })
    }

    let handleSaveCar = () => {
        let shouldLikeCar = heart === heartOutline
        setHeart(shouldLikeCar ? heartFilled : heartOutline)
        if (shouldLikeCar) {
            const likedCars = localStorage.getItem('likedCars') ?? "[]"
            let currCars = JSON.parse(likedCars)
            currCars.push({ ...props.car })
            localStorage.setItem("likedCars", JSON.stringify(currCars))
        }
        if (shouldLikeCar === false) {
            const likedCars = localStorage.getItem('likedCars')
            let currCars = JSON.parse(likedCars)
            currCars = currCars.filter(car =>  car.make !== props.car.make || 
                car.model !== props.car.model || 
                car.year !== props.car.year ||
                car.body !== props.car.body || 
                car.details !== props.car.details
                || car.zeroToSixty !== props.car.zeroToSixty)
            console.log(currCars)
            localStorage.setItem("likedCars", JSON.stringify(currCars))
        }
        if (props?.user?.loggedIn) {
            updateLikedCars()
        }
    }

    return (
        <div className={resultStyles.resultContainer}>
            <div className={resultStyles.resultWrapper}>
                {
                    props.car.image ?
                        <div className={resultStyles.resultImageContainer}>
                            <img src={props.car.image} alt="photo of car" />
                        </div>
                        : <div className={resultStyles.noImageSpace} />
                }
                <div className={resultStyles.resultDetailsContainer}>
                    <div className={resultStyles.resultTitle}>{`${props.car.year} ${props.car.make} ${props.car.model.substring(0,1).toUpperCase()}${props.car.model.substring(1)}` }</div>
                    <div className={resultStyles.resultDetailsAndDesc}>
                        <div className={resultStyles.resultDetails}>
                            <div className={resultStyles.resultDetail}>0-60: {props.car.zeroToSixty}</div>
                            <div className={resultStyles.resultDetail}>1/4 Mile: {props.car.quarterMile}</div>
                            <div className={resultStyles.resultDetail}>Body: {props.car.body}</div>
                        </div>
                        <div className={resultStyles.resultDetailDesc}>Details: {props.car.details}</div>
                    </div>
                </div>
                <div className={resultStyles.saveButtonWrapper}>
                    <button onClick={handleSaveCar} className={resultStyles.saveButton}>
                        <img src={heart} alt="heart" />
                    </button>
                </div>

            </div>
        </div>
    )
}


export default TimeResult