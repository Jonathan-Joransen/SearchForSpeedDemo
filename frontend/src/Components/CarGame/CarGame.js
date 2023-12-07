import carStyles from '../Styles/CarGame.module.css'
import {useRef, useState, useEffect } from 'react'
import styled, {keyframes, css} from "styled-components";

let CarGame = (props) => {
    const [moveCars, setMoveCars] = useState(false)

    const moveCar = keyframes`
        0% { transform : translateX(0vw) }
        100% { transform : translateX(80vw) }`

    const CarTwoSpeed = styled.div`
        animation: ${moveCar}; 
        animation-duration: ${props.carTwo.duration}; 
        animation-timing-function: ${props.carTwo.timing};
        animation-fill-mode: forwards;`

    const CarOneSpeed = styled.div`
        animation: ${moveCar}; 
        animation-duration: ${props.carOne.duration}; 
        animation-timing-function: ${props.carOne.timing};
        animation-fill-mode: forwards;`    

    let carOneJsx = () => {
        if(moveCars){
            return(
                <CarOneSpeed>
                   <div className={carStyles.car} ><img src={props.carOne.icon}></img></div>
                </CarOneSpeed>
                )
        }
        return(
            <div className={carStyles.car} ><img src={props.carOne.icon}></img></div>
        )
    }
    let carTwoJsx = () => {
        if(moveCars){
            return(
                <CarTwoSpeed>
                    <div className={carStyles.car} ><img src={props.carTwo.icon}></img></div>
                </CarTwoSpeed>
                )
        }
        return (
            <div className={carStyles.car} ><img src={props.carTwo.icon}></img></div>
        )
    }

    let startCars = (e) => {
        e.preventDefault()
        setMoveCars(true)
        // console.log(moveCars)    
        console.log("go")
    }

    return(        
        <div className={carStyles.car_grid}>
            <button className={carStyles.start_button} onClick={startCars}>Go!</button>

            <div className={carStyles.car_container}>
                {carOneJsx()}
                {carTwoJsx()}
                <div className={carStyles.finish_line}></div>

            </div>
        </div>
    )
}

export default CarGame