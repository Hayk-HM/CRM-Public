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

type PropsType = {
  creator: string
  title: string
  description: string
  urgency: string
  status: string
  createdFor: string
  id: string
  handleToggle: () => void
}

const TaskElement: React.FC<PropsType> = ({ creator, title, description, urgency, status, createdFor, id, handleToggle }) => {

  const classes = makeStyles()
  const dispatch = useDispatch()

  const onHandelClick = (): void => {
    dispatch(updateTaskAction.updateTaskId(id))
  }

  return (
    <TableBody onClick={onHandelClick}>
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
