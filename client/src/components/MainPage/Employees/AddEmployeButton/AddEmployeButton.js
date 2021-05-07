import React from 'react'
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add'
import {
  Tooltip,
  Fab
} from '@material-ui/core'

import useStyles from './Style'

const AddEmployeeButton = () => {

  const classes = useStyles()
  const history = useHistory()

  const handelAddEmployee = () => {
    history.push('/main/register')
  }

  return (
    <Tooltip title="Add" aria-label="add" onClick={handelAddEmployee} >
      <Fab color="primary" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Tooltip>
  )
}

export default AddEmployeeButton
