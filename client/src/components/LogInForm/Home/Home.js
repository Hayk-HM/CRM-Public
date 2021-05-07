import { Switch, Route } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import style from './Home.module.css'
import SignUp from '../SignUp/SignUp'
import SignIn from "../SignIn/SignIn";
import InfoList from "../InfoList/InfoList";
import Header from "../Header/Header";


const Home = () => {

  return (
    <Grid className={style.body} md={12}>
      <Grid container xs={12} sm={12} md={12}>
        <Header />
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} md={6}>
          <InfoList />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Switch>
            <Route path='/home/signin' render={() => <SignIn />} />
            <Route path='/home' render={() => <SignUp />} />
          </Switch>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home