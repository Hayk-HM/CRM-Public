import React from 'react'
import {
  TableCell,
  TableBody,
  Typography,
  TableRow,
  Avatar
} from '@material-ui/core'

import logo from '../../../images/logo.png'
import makeStyles from './Style'

const Employee = ({ photo, fullName, email, location, phone, store }) => {

  const classes = makeStyles()

  return (
    <TableBody className={classes.tableContainer}>
      <TableRow hover>
        <TableCell>
          <Avatar alt="Remy Sharp" src={logo} className={classes.large} />
        </TableCell>
        <TableCell>
          <Typography>{fullName}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{email}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{location}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{phone}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{store}</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default Employee
