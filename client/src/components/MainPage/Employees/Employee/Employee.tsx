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

type PropsType = {
  photo: string
  fullName: string
  email: string
  location: string
  phone: string
  store: string
}

const Employee: React.FC<PropsType> = ({ photo, fullName, email, location, phone, store }) => {

  const classes = makeStyles()

  return (
    <TableBody>
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
