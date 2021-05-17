import React from 'react'
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  FormHelperText
} from "@material-ui/core";

import { createChatAction } from "../../../../redux/actions/chatActions";
import { socket } from '../Chat'
import useStyles from './Style'


const InputForm = () => {

  const dispatch = useDispatch()
  const classes = useStyles()
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem('profile'))

  type MyFormType = {
    message: string
    policy?: boolean
  }

  const initialValues: MyFormType = {
    message: '',
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={
        Yup.object().shape({
          message: Yup.string().max(255).required('Message is required'),
        })
      }
      onSubmit={(values, { resetForm }) => {
        const messageData = {
          room: user.result.company,
          user: user.result,
          message: values.message
        }
        socket.emit('send_message', messageData)
        dispatch(createChatAction(messageData))
        resetForm()
      }}
    >
      {
        ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit }) => (

          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              fullWidth
              helperText={touched.message && errors.message}
              placeholder="New Message"
              margin="normal"
              name="message"
              onBlur={handleBlur}
              onChange={handleChange}
              type="message"
              value={values.message}
              variant="outlined"
            />
            {Boolean(touched.policy && errors.policy) && (
              <FormHelperText error> {errors.policy} </FormHelperText>
            )}
            <div>
              <Button className={classes.button} color="primary" fullWidth size="large" type="submit" variant="contained"> Send </Button>
            </div>
          </form>
        )}
    </Formik>
  )
}

export default InputForm