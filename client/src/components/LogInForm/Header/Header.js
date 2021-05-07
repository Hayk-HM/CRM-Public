import React, { useState } from 'react'
import { Button, Container, Grid } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'

import logo from '../../images/logo.png'
import useStyles from './Style'


const Header = () => {

  const history = useHistory()
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const handlerClickSignIn = () => {
    history.push('/home/signin')
  }

  const handlerClickLogOut = () => {
    localStorage.removeItem('profile')
    history.push('/home')
  }

  return (
    <Container maxWidth='lg'>
      <Grid container direction="row" justify="space-between" alignItems="flex-start" md={12}>
        <Grid item>
          <Link to='/home'>
            <img src={logo} alt="logo" className={classes.media} />
          </Link>
        </Grid>
        <Grid item className={classes.loginButton}>
          {
            !user?.token
              ? <Button className={classes.loginButton} variant="contained" color="secondary" onClick={handlerClickSignIn}>
                Sign in
                </Button>
              : <Button className={classes.loginButton} variant="contained" color="secondary" onClick={handlerClickLogOut}>
                Log Out
                </Button>
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Header