import React from 'react'
import { useHistory } from "react-router-dom"
import MuiAlert from '@material-ui/lab/Alert'
import {
  Button,
  Grid
} from '@material-ui/core'

import useStyles from './Style'

const RegistrationSuccess: React.FC = () => {

  const classes = useStyles()
  const history = useHistory()

  const handelRegistration = (): void => {
    history.push('/main/register')
  }

  const handelTask = (): void => {
    history.push('/main/task')
  }

  return (
    <Grid container className={classes.rootGrid}>
      <Grid className={classes.root} item>
        <MuiAlert elevation={6} variant="filled" severity="success">Registration completed successfully!</MuiAlert>
      </Grid>
      <Grid item className={classes.buttons}>
        <Button variant="contained" color="primary" className={classes.button} onClick={handelRegistration}>
          Continue registration
        </Button>
        <Button variant="contained" color="primary" onClick={handelTask}>
          Go to task
      </Button>
      </Grid>
    </Grid>
  );
}

export default RegistrationSuccess
