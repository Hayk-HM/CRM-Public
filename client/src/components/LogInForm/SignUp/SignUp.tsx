import React from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, Link } from 'react-router-dom';
import { Formik } from "formik";
import { useHistory } from "react-router-dom"
import * as Yup from "yup";
import {
  Checkbox,
  Button,
  Container,
  TextField,
  Typography,
  Box,
  FormHelperText
} from '@material-ui/core'

import { signUpAction } from "../../../redux/actions/authActions"

export type MyFormTypeSignUp = {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  company: string
  policy?: boolean
}

const SignUp: React.FC = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const initialValues: MyFormTypeSignUp = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    company: '',
    policy: false,
  }

  return (
    <Container component="main" maxWidth="xs">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            firstName: Yup.string().max(255).required('First name is required'),
            lastName: Yup.string().max(255).required('Last name is required'),
            password: Yup.string().max(255).required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
            company: Yup.string().max(255).required('Company is required'),
            policy: Yup.boolean().oneOf([true], 'This field must be checked')
          })
        }
        onSubmit={(values) => {
          dispatch(signUpAction(values, history))
        }}
      >
        {
          ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit }) => (

            <form onSubmit={handleSubmit}>
              <Typography color="textPrimary" variant="h2" align='center'> Create new company </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2" align='center'> Use your email to create new account</Typography>
              <TextField
                error={Boolean(touched.firstName && errors.firstName)}
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label="First name"
                margin="normal"
                name="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
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
                value={values.lastName}
                variant="outlined"
              />
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
                error={Boolean(touched.company && errors.company)}
                fullWidth
                helperText={touched.company && errors.company}
                label="Company"
                margin="normal"
                name="company"
                onBlur={handleBlur}
                onChange={handleChange}
                type="company"
                value={values.company}
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
              <TextField
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                fullWidth
                helperText={touched.confirmPassword && errors.confirmPassword}
                label="Confirm Password"
                margin="normal"
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.confirmPassword}
                variant="outlined"
              />
              <Checkbox checked={values.policy} name="policy" onChange={handleChange} />
              <Typography color="textSecondary" variant="body1" >
                I have read the
                    {' '}
                <Link color="primary" component={RouterLink} to="#"  >
                  Terms and Conditions
                    </Link>
              </Typography>
              {Boolean(touched.policy && errors.policy) && (
                <FormHelperText error>
                  {errors.policy}
                </FormHelperText>
              )}
              <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Sign up now
                </Button>
            </form>
          )}
      </Formik>
    </Container>
  )
}

export default SignUp