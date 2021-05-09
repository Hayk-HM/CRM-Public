import React, { useState } from 'react';
import { Link, useHistory, Switch, Route } from "react-router-dom";
import {
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
  Typography
} from '@material-ui/core';

import RegistrationSuccess from '../Register/RegistrationSuccess/RegistrationSuccess'
import { EmployeesIcon } from '../../icons/EmployeesIcon'
import { RegisterIcon } from "../../icons/RegisterIcon"
import { SettingsIcon } from "../../icons/SettingsIcon"
import { AccountIcon } from "../../icons/AccountIcon"
import { ChatIcon } from "../../icons/ChatIcon"
import { TaskIcon } from '../../icons/TaskIcon'
import Employees from '../Employees/Employees'
import Register from "../Register/Register"
import Settings from "../Settings/Settings"
import Account from "../Account/Account"
import Task from '../Tasks/Tasks'
import Chat from '../Chat/Chat'
import useStyles from './Style'

const DashboardSidebar = () => {

  const classes = useStyles()
  const history = useHistory()

  const icons = [TaskIcon, ChatIcon, EmployeesIcon, AccountIcon, RegisterIcon, SettingsIcon]
  const settingField = ['Task', 'Chat', 'Employees', 'Register']

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }} >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Divider />
          <Grid className={classes.profileLogo}>
            <Avatar component={Link} to='/main/account' className={classes.avatar} alt={user?.result?.name} src={user?.result?.photo} >{user?.result?.fullName.charAt(0).toUpperCase()}</Avatar>
          </Grid>
          <Grid className={classes.profileName}>
            <Typography className={classes.fullName} variant='h6'>{user?.result?.fullName}</Typography>
          </Grid>
          {settingField.map((fieldName, index) => (
            (history.location.pathname.split('/')[2] === fieldName.toLowerCase())
              ? <List key={fieldName}  >
                <ListItem selected className={classes.link} button component={Link} to={`/main/${fieldName.toLowerCase()}`}>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={fieldName} />
                </ListItem>
              </List>
              : <List key={fieldName}  >
                <ListItem className={classes.link} button component={Link} to={`/main/${fieldName.toLowerCase()}`}>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={fieldName} />
                </ListItem>
              </List>
          ))
          }
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route path='/main/task' render={() => <Task />} />
          <Route path='/main/chat' render={() => <Chat />} />
          <Route path='/main/employees' render={() => <Employees />} />
          <Route path='/main/account' render={() => <Account />} />
          <Route path='/main/register' render={() => <Register />} />
          <Route path='/main/RegistrationSuccess' render={() => <RegistrationSuccess />} />
          <Route path='/main/settings' render={() => <Settings />} />
        </Switch>
      </main>
    </div >
  );
}

export default DashboardSidebar
