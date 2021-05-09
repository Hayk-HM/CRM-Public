import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import logo from '../../images/logo.png'
import './Header.scss'

const Header = () => {

  const history = useHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const handlerClickSignIn = () => {
    history.push('/home/signin')
  }

  const handlerClickLogOut = () => {
    localStorage.removeItem('profile')
    history.push('/home')
  }

  return (
    <div className='navBar'>
      <div className='logo'>
        <Link to='/home'>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className='loginLogout'>
        {
          !user?.token
            ? <button className='btn' onClick={handlerClickSignIn}> Sign in </button>
            : <button className='btn' onClick={handlerClickLogOut}> Log Out </button>
        }
      </div>
    </div>
  )
}

export default Header