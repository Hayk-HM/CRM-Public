import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import {
  Tooltip,
  Backdrop,
  Fab
} from '@material-ui/core'

import TaskCreateForm from "../TaskCreateForm/TaskCreateForm"
import useStyles from './Style'

const AddTaskButton: React.FC = () => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (): void => {
    setOpen(false);
  };
  const handelAddTask = (): void => {
    setOpen(!open);
    //console.log("Add new Task");
  }

  return (
    <div>
      <Tooltip title="Add" aria-label="add" onClick={handelAddTask}>
        <Fab color="primary" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Backdrop className={classes.backdrop} open={open} >
        <TaskCreateForm handleClose={handleClose} />
      </Backdrop>
    </div>
  )
}

export default AddTaskButton
