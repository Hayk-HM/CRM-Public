import React, { useState } from 'react'

import './ChatElement.scss'

const ChatElement = ({ name, message }) => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  return (
    <div className={`main ${user.result.fullName === name ? 'right' : 'left'}`}>
      <div className='name'> {name} </div>
      <div className='message'> {message} </div>
    </div>
  )
}

export default ChatElement