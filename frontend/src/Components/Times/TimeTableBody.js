import React from 'react'
import timeStyles from './Times.module.css';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const TimeTableBody = (props) => {
    let getBody = (body) => {
        if (body.length <= 6) {
            return body
        }
        if (body === "convertible") {
            return "conv."
        }
        if (body === "station wagon" || body === "sports wagon") {
            return "sw"
        }
        if (body === "hatchback") {
            return "hatch"
        }
    }
    return (
        <>
            <TableBody>
                {props.cars.map((car, idx) => (
                    <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell className={timeStyles.yearCell}>{car.year}</TableCell>
                        <TableCell className={timeStyles.cell}>{getBody(car.body)}</TableCell>
                        <TableCell className={timeStyles.cell} >{car.zeroToSixty}</TableCell>
                        <TableCell className={timeStyles.cell}>{car.quarterMile === 0 ? "--" : car.quarterMile}</TableCell>
                        <TableCell className={timeStyles.cell}>{car.details}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>

    )
}

export default TimeTableBody