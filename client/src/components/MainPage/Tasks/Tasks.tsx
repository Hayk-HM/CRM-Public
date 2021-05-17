import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as Yup from 'yup'
import { connect, Formik } from "formik"
import moment from 'moment'
import { Close } from '@material-ui/icons'
import io, { Socket } from 'socket.io-client'
import {
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Card,
  Table,
  Paper,
  Backdrop,
  Tooltip,
  Fab,
  TextField,
  Container,
  Button,
  FormHelperText,
  MenuItem
} from "@material-ui/core"

import { updateTaskAction } from "../../../redux/actions/tasksActions"
import { taskActions } from '../../../redux/actions/tasksActions'
import { AppStateType } from '../../../redux/store/store'
import AddTaskButton from "./AddTaskButton/AddTaskButton"
import TaskElement from './TaskElement/TaskElement'
import useStyles from './Style'


const CONNECTION_URL = 'localhost:5000'
export let socket: typeof Socket;

const Tasks: React.FC = () => {

  const dispatch = useDispatch()
  const classes = useStyles()
  const tasks = useSelector((state: AppStateType) => state.tasks)
  const task = useSelector((state: AppStateType) => state.tasks.filter(task => task._id === state.updateTaskId.updateTaskId)[0])

  const user = JSON.parse(localStorage.getItem('profile') || '[]')
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const closeTaskBare = () => {
    handleClose()
  }

  useEffect(() => {
    socket = io(CONNECTION_URL)
    socket.emit('join_task_room', `Task ${user.result.company}`)
  }, [user.result.company])

  useEffect(() => {
    socket.on('receive_task', (data: any) => {
      dispatch(taskActions.createTask(data))
    })
  }, [])

  type myFormType = {
    creatorName: string
    company: string
    taskDescription: string
    createdAt: string
    createdAtFromNow: string
    title: string
    urgency: string
    status: string
    comment: string
    policy?: boolean
  }

  const initialValues: myFormType = {
    creatorName: String(task?.creatorName),
    company: String(task?.company),
    taskDescription: String(task?.description),
    createdAt: moment(task?.createdAt).format('lll'),
    createdAtFromNow: moment(task?.createdAt).fromNow(),
    title: String(task?.title),
    urgency: String(task?.urgency),
    status: String(task?.status),
    comment: String(task?.comment),
  }

  return (
    <div>
      <Grid>
        <AddTaskButton />
      </Grid>
      <Grid>
        <Card>
          <PerfectScrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Photo</TableCell>
                    <TableCell>Creator</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Urgency</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created For</TableCell>
                  </TableRow>
                </TableHead>
                {
                  tasks ? tasks?.map(task => {
                    return <TaskElement
                      handleToggle={handleToggle}
                      id={task._id}
                      key={task._id}
                      creator={task?.creatorName}
                      title={task?.title}
                      description={task?.description}
                      urgency={task?.urgency}
                      status={task?.status}
                      createdFor={task?.createdFor}
                    />
                  }) : null
                }
              </Table>
            </TableContainer>
          </PerfectScrollbar>
        </Card>
      </Grid>
      <Grid>
        <div>
          <Backdrop className={classes.backdrop} open={open} >
            <Paper elevation={3}>
              <Tooltip title="Close" aria-label="add" onClick={closeTaskBare} className={classes.closeButton}>
                <Fab color="secondary" >
                  <Close onClick={handleClose} />
                </Fab>
              </Tooltip>
              <Container maxWidth="sm">
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={
                    Yup.object().shape({
                      creatorName: Yup.string().max(255).required('Creator Name is required'),
                      company: Yup.string().max(255).required('Company is required'),
                      taskDescription: Yup.string().max(255).required('Task Description is required'),
                      createdAt: Yup.string().max(255).required('Created at is required'),
                      createdAtFromNow: Yup.string().max(255).required('Created at is required'),
                      title: Yup.string().max(255).required('Title is required'),
                      urgency: Yup.string().max(255).required('Urgency is required'),
                      status: Yup.string().max(255).required('Status is required'),
                      comment: Yup.string().max(255).required('comment is required'),
                    })
                  }
                  onSubmit={(values, { resetForm }) => {
                    dispatch(updateTaskAction(values, task._id))
                    closeTaskBare()
                    resetForm()
                  }}
                >
                  {
                    ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit }) => (
                      <form onSubmit={handleSubmit} >
                        <Grid container className={classes.gridContainer}>
                          <Grid item >
                            <TextField
                              disabled
                              error={Boolean(touched.creatorName && errors.creatorName)}
                              fullWidth
                              helperText={touched.creatorName && errors.creatorName}
                              label="Creator Name"
                              margin="normal"
                              name="creatorName"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.creatorName}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item >
                            <TextField
                              disabled
                              error={Boolean(touched.company && errors.company)}
                              fullWidth
                              helperText={touched.company && errors.company}
                              label="Company"
                              margin="normal"
                              name="company"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.company}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item >
                            <TextField
                              disabled
                              error={Boolean(touched.createdAt && errors.createdAt)}
                              fullWidth
                              helperText={touched.createdAt && errors.createdAt}
                              label="Created At"
                              margin="normal"
                              name="createdAt"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.createdAt}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item>
                            <TextField
                              disabled
                              error={Boolean(touched.createdAtFromNow && errors.createdAtFromNow)}
                              fullWidth
                              helperText={touched.createdAtFromNow && errors.createdAtFromNow}
                              label="Created At"
                              margin="normal"
                              name="createdAtFromNow"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values.createdAtFromNow}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <TextField
                          error={Boolean(touched.title && errors.title)}
                          disabled
                          fullWidth
                          helperText={touched.title && errors.title}
                          label="Title"
                          margin="normal"
                          name="title"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          value={values.title}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.taskDescription && errors.taskDescription)}
                          disabled
                          fullWidth
                          helperText={touched.taskDescription && errors.taskDescription}
                          label="Task Description"
                          margin="normal"
                          name="taskDescription"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          rows={4}
                          value={values.taskDescription}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.comment && errors.comment)}
                          fullWidth
                          helperText={touched.comment && errors.comment}
                          label="Comment"
                          margin="normal"
                          name="comment"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          rows={4}
                          value={values.comment !== "undefined" ? values.comment : ""}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.urgency && errors.urgency)}
                          disabled
                          fullWidth
                          helperText={touched.urgency && errors.urgency}
                          label="Urgency"
                          margin="normal"
                          name="urgency"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          multiline
                          value={values.urgency}
                          variant="outlined"
                        />
                        <TextField
                          error={Boolean(touched.status && errors.status)}
                          fullWidth
                          helperText={touched.status && errors.status}
                          label="Status"
                          margin="normal"
                          name="status"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          select
                          value={values.status !== "undefined" ? values.comment : ""}
                          variant="outlined"
                        >
                          <MenuItem key='Not in progress' value='Not in progress'> Not in progress </MenuItem>
                          <MenuItem key='In progress' value='In progress'> In progress </MenuItem>
                          <MenuItem key='Done' value='Done'> Done </MenuItem>
                        </TextField>
                        {Boolean(touched.policy && errors.policy) && (
                          <FormHelperText error> {errors.policy} </FormHelperText>
                        )}
                        <Button color="primary" fullWidth size="large" type="submit" variant="contained" className={classes.updateButton}>
                          Update task
                            </Button>
                      </form>
                    )}
                </Formik>
              </Container>
            </Paper>
          </Backdrop>
        </div>
      </Grid>
    </div>
  )
}

export default Tasks
