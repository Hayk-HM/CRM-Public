import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import logo from '../../images/logo.png'
import './Header.scss'

const Header: React.FC = () => {

  const history = useHistory()

  const handlerClickSignIn = (): void => {
    history.push('/home/signin')
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
          <button className='btn' onClick={handlerClickSignIn}> Sign in </button>
        }
      </div>
    </div>
  )
}

export default Header