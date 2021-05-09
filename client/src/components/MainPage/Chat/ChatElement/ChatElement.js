import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import useStyles from './Style'

const ChatElement = ({ name, message }) => {

  const classes = useStyles()

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2} className={classes.mainGrid}>
          <Grid item className={classes.innerGrid} > {name} </Grid>
          <Grid item> {message} </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default ChatElement