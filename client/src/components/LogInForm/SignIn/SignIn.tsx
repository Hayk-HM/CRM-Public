import React from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography
} from "@material-ui/core";

import { signinAction } from "../../../redux/actions/authActions";

export type MyFormTypeSignIn = {
  email: string | undefined,
  password: string | undefined,
  policy?: boolean | undefined
}

const SignIn: React.FC = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const initialValues: MyFormTypeSignIn = {
    email: "",
    password: ""
  }

  return (
    <Container maxWidth="xs" component='main' >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: Yup.string().max(255).required('password is required'),
          })
        }
        onSubmit={(values, { resetForm }) => {
          dispatch(signinAction(values, history))
          resetForm()
        }}
      >
        {
          ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit, resetForm }) => (

            <form onSubmit={handleSubmit}>
              <Typography color="textPrimary" variant="h2" align='center' > Log In </Typography>
              <TextField
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
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              {
                Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error> {errors.policy} </FormHelperText>
                )
              }
              <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Sign up now
                </Button>
            </form>
          )}
      </Formik>
    </Container >
  )
}

export default SignIn
