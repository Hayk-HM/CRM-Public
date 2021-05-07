import React from 'react'
import { Container, Typography } from '@material-ui/core'

import useStyles from './Style'

const InfoList = () => {

  const classes = useStyles()
  return (
    <Container maxWidth='sm' component='main' className={classes.container} >
      <Typography variant='h3' className={classes.title}>  What you will have with us </Typography>
      <Typography variant='h5' className={classes.subTitle}> Tasks </Typography>
      <Typography variant='h6' className={classes.text}> Create tasks and take control of your entire business </Typography>
      <Typography variant='h5' className={classes.subTitle}> Chat </Typography>
      <Typography variant='h6' className={classes.text}> Create chat and communicate with colleagues </Typography>
    </Container>
  )
}

export default InfoList