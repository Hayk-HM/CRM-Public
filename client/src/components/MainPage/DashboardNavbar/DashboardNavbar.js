
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";

import { getTasksAction } from "./../../../redux/actions/tasksActions";
import { getUsersAction } from '../../../redux/actions/userActions';
import { authActions } from "./../../../redux/actions/authActions";
import logo from '../../images/logo.png'
import useStyles from './Style'

const DashboardNavbar = () => {

  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const location = useLocation();

  const handelLogo = () => {
    history.push(`/main/${user.result.company.split(' ').join('').toLowerCase()}`)
  }

  const handelLogoutButton = () => {
    localStorage.removeItem('profile')
    dispatch(authActions.logout())
    history.push('/home')
  }

  const logout = () => {
    dispatch(authActions.logout())
    // history.push('/');
    // setUser(null);
  };

  useEffect(() => {
    return dispatch(authActions.signIn(user))
  })

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user?.token]);

  useEffect(() => {
    return dispatch(getUsersAction(user?.result?.company))
  })

  useEffect(() => {
    return dispatch(getTasksAction(user?.result?.company))
  })

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} alt='logo' className={classes.logo} onClick={handelLogo} />
          </IconButton>
          <Typography variant="h6" className={classes.title}> CRM </Typography>
          <Button variant='contained' color="secondary" onClick={handelLogoutButton}>Log out</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default DashboardNavbar