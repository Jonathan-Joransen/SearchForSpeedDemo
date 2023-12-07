import React, { useState } from 'react'
import timeStyles from './Times.module.css';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

const TimeTableHeader = (props) => {
    return (
        <TableHead>
            <TableRow>
                {props.names?.map(name => {
                    let colWidth = name !== 'Details'
                        ? '10%' : '60%'
                    return <TableCell key={name}
                        style={{ width: colWidth }} 
                        className={name !== 'Year' ? timeStyles.cell : timeStyles.yearCell}>
                        <TableSortLabel
                        style={{ fontWeight: 'bold' }}
                        active={props.columnData.columnToSort === name}
                            direction={props.columnData.sortDirection}
                            onClick={() => props.handleSort(name)}
                        >
                            {name}
                        </TableSortLabel>
                    </TableCell>
                })}
            </TableRow>
        </TableHead>
    )
}

export default TimeTableHeader