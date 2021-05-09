import { Switch, Route } from 'react-router-dom'

import './Home.scss'
import SignUp from '../SignUp/SignUp'
import SignIn from "../SignIn/SignIn";
import InfoList from "../InfoList/InfoList";
import Header from "../Header/Header";


const Home = () => {

  return (
    <div className='mainInfoBar'>
      <div>
        <Header />
      </div>
      <div className='infoBar'>
        <InfoList />
        <div>
          <Switch>
            <Route path='/home/signin' render={() => <SignIn />} />
            <Route path='/home' render={() => <SignUp />} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Home