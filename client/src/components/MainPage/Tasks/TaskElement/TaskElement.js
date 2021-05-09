import React from 'react'
import { useDispatch } from "react-redux"
import {
  TableCell,
  TableBody,
  Typography,
  TableRow,
  Avatar
} from '@material-ui/core'

import { updateTaskAction } from '../../../../redux/actions/updateTask'
import logo from '../../../images/logo.png'
import makeStyles from './Style'

const TaskElement = ({ creator, title, description, urgency, status, createdFor, id, handleToggle }) => {

  const classes = makeStyles()
  const dispatch = useDispatch()

  const onHandelClick = () => {
    dispatch(updateTaskAction.updateTaskId(id))
  }

  return (
    <TableBody className={classes.tableContainer} onClick={onHandelClick}>
      <TableRow hover onClick={handleToggle}>
        <TableCell>
          <Avatar alt={creator} src={logo} className={classes.large} />
        </TableCell>
        <TableCell>
          <Typography>{creator}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{title}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{description}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{urgency}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{status}</Typography>
        </TableCell>
        <TableCell>
          <Typography>{createdFor}</Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

export default TaskElement
