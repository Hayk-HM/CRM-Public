import React, { useState } from 'react'
import Home from "./components/LogInForm/Home/Home";
import { Switch, Route, Redirect } from "react-router-dom";
// import Pusher from 'pusher-js'

import Dashboard from "./components/MainPage/Dashboard";

const App: React.FC = () => {

  //@ts-ignore
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  // useEffect(() => {
  //   const pusher = new Pusher('8d7a83069c1d1e1f1384', {
  //     cluster: 'eu'
  //   });

  //   const channel = pusher.subscribe('message');
  //   channel.bind('inserted', (newMessage) => {
  //     alert(JSON.stringify(newMessage));
  //   });

  //   return () => {
  //     channel.unbind_all()
  //     channel.unsubscribe()
  //   }
  // }, [])

  return (
    <Switch>
      <Route exact path='/' render={() => {
        return !user?.token ? <Redirect to={'/home'} /> : <Redirect to={'/main'} />
      }} />
      <Route path='/home' render={() => <Home />} />
      <Route path='/main' render={() => <Dashboard />} />
    </Switch>
  )
}

export default App
