import React from 'react'
import * as Yup from 'yup';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
//@ts-ignore
import { Helmet } from 'react-helmet'
import {
  Grid,
  Box,
  TextField,
  Button,
  FormHelperText,
  Avatar,
  ButtonBase,
  Paper
} from '@material-ui/core';

import { updateUserAction } from '../../../redux/actions/userActions';
import useStyles from './Style'


const Account: React.FC = () => {

  //@ts-ignore
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles();
  const dispatch = useDispatch()

  type MyFormValues = {
    email: string
    firstName: string
    lastName: string
    company: string
    policy?: boolean
  }
  const initialValues: MyFormValues = {
    email: String(user?.result?.email),
    firstName: String(user?.result?.firstName),
    lastName: String(user?.result?.lastName),
    company: String(user?.result?.company),
  }

  return (
    <div className={classes.root}>
      {
        //@ts-ignore
        <Helmet> <title>Account</title> </Helmet>
      }
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <Avatar className={classes.avatar} alt={user?.result?.name} src={user?.result?.photo} >{user?.result?.fullName.charAt(0).toUpperCase()}</Avatar>
            </ButtonBase>
          </Grid>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                company: Yup.string().max(255).required('Company is required'),
              })
            }
            onSubmit={(values, { resetForm }) => {
              dispatch(updateUserAction(user.result._id, values))
            }}
          >
            {
              ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit }) => (

                <form onSubmit={handleSubmit}>
                  <TextField
                    disabled
                    error={Boolean(touched.company && errors.company)}
                    fullWidth
                    helperText={touched.company && errors.company}
                    label="company"
                    margin="normal"
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="company"
                    value={values.company}
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First Name"
                    margin="normal"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="firstName"
                    value={values.firstName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    margin="normal"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="lastName"
                    value={values.lastName}
                    variant="outlined"
                  />
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error> {errors.policy} </FormHelperText>
                  )}
                  <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                    Update
                    </Button>
                </form>
              )}
          </Formik>
        </Grid>
      </Paper>
    </div >
  );
}

export default Account
