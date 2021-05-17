import React from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'
//@ts-ignore
import { Helmet } from 'react-helmet'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core'

import { signupEmployeeAction } from "../../../redux/actions/authActions";

export type MyFormTypeEmployees = {
  email: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  policy?: boolean
  company?: string
}

const Register: React.FC = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  //@ts-ignore
  const userCompany = JSON.parse(localStorage.getItem('profile')).result.company

  const initialValues: MyFormTypeEmployees = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    policy: false,
  }

  return (
    <>
      {
        //@ts-ignore
        <Helmet> <title>Register | Material Kit</title> </Helmet>
      }
      <Container maxWidth="sm">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={
            Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              firstName: Yup.string().max(255).required('First name is required'),
              lastName: Yup.string().max(255).required('Last name is required'),
              password: Yup.string().max(255).required('password is required'),
              confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
              policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })
          }
          onSubmit={(values, isSubmitting) => {
            dispatch(signupEmployeeAction({ ...values, company: userCompany }, history))
          }}
        >
          {
            ({ errors, handleBlur, handleChange, isSubmitting, touched, values, handleSubmit }) => (

              <form onSubmit={handleSubmit}>
                <Typography color="textPrimary" variant="h2" > Create new account </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2" >
                  Use your email to create new account
                  </Typography>
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
                  <Link color="primary" component={RouterLink} to="#" underline="always" variant="body1" >
                    Terms and Conditions
                    </Link>
                </Typography>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error> {errors.policy} </FormHelperText>
                )}
                <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                  Sign up now
                  </Button>
              </form>
            )}
        </Formik>
      </Container>
    </>
  );
};

export default Register
