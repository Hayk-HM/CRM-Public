import { useSelector } from "react-redux"
import React, { useState } from 'react'
import { Helmet } from "react-helmet"
import { Formik } from "formik"
import * as Yup from 'yup'
import { Close } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import {
  Box,
  Container,
  TextField,
  FormHelperText,
  Button,
  Paper,
  Tooltip,
  Fab,
  MenuItem
} from "@material-ui/core"

import { createTaskAction } from '../../../../redux/actions/tasksActions'
import { socket } from '../Tasks'
import useStyles from './Style'

const TaskCreateForm = ({ handleClose }) => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const users = useSelector((state) => state.users)

  const closeTaskBare = () => {
    handleClose()
  }

  return (
    <>
      <Helmet> <title>Create a new task</title> </Helmet>

      <Paper elevation={3}>
        <Tooltip title="Close" aria-label="add" onClick={closeTaskBare} className={classes.closeButton}>
          <Fab color="secondary" className={classes.fab}>
            <Close />
          </Fab>
        </Tooltip>
        <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }} >
          <Container maxWidth="sm">
            <Formik
              enableReinitialize
              initialValues={{
                taskTitle: '',
                taskDescription: '',
                urgency: '',
                creatorId: user?.result?._id,
                creatorName: user?.result?.fullName,
                company: user?.result?.company,
                createdFor: '',
                email: '',
              }}
              validationSchema={
                Yup.object().shape({
                  taskTitle: Yup.string().max(255).required('Task title is required'),
                  taskDescription: Yup.string().max(255).required('Task description is required'),
                  urgency: Yup.string().max(255).required('Urgency is required'),
                  createdFor: Yup.string().max(255).required('Created For is required'),
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                })
              }
              onSubmit={(values, { resetForm }) => {
                const fromSocket = {
                  company: values.company,
                  creatorName: values.creatorName,
                  title: values.taskTitle,
                  description: values.taskDescription,
                  urgency: values.urgency,
                  createdFor: values.createdFor,
                  status: 'Not in progress'
                }

                socket.emit('create_task', fromSocket)
                dispatch(createTaskAction(values))
                closeTaskBare()
                resetForm({ values: '' })
              }}
            >
              {
                ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit }) => (

                  <form onSubmit={handleSubmit}>
                    <TextField
                      error={Boolean(touched.taskTitle && errors.taskTitle)}
                      fullWidth
                      helperText={touched.taskTitle && errors.taskTitle}
                      label="Task Title"
                      margin="normal"
                      name="taskTitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.taskTitle}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.taskDescription && errors.taskDescription)}
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
                      error={Boolean(touched.urgency && errors.urgency)}
                      fullWidth
                      helperText={touched.urgency && errors.urgency}
                      label="Urgency"
                      margin="normal"
                      name="urgency"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      select
                      value={values.urgency}
                      variant="outlined"
                    >
                      <MenuItem key='Not urgent' value='Not urgent'> Not urgent </MenuItem>
                      <MenuItem key='Urgent' value='Urgent'> Urgent </MenuItem>
                      <MenuItem key='Immediately' value='Immediately'> Immediately </MenuItem>
                      ))
                    </TextField>
                    <TextField
                      error={Boolean(touched.createdFor && errors.createdFor)}
                      fullWidth
                      helperText={touched.createdFor && errors.createdFor}
                      label="Created For"
                      margin="normal"
                      name="createdFor"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      select
                      value={values.createdFor}
                      variant="outlined"
                    >
                      {
                        users.map(user => {
                          values.email = user.email
                          return <MenuItem key={user.fullName} value={user.fullName}> {user.fullName} </MenuItem>
                        })
                      }
                    </TextField>
                    {Boolean(touched.policy && errors.policy) && (
                      <FormHelperText error> {errors.policy} </FormHelperText>
                    )}
                    <Box sx={{ py: 2 }}>
                      <Button color="primary" fullWidth size="large" type="submit" variant="contained" className={classes.button}>
                        Create Task
                      </Button>
                    </Box>
                  </form>
                )}
            </Formik>
          </Container>
        </Box>
      </Paper>
    </>
  )
}

export default TaskCreateForm
