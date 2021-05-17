import React, { useState } from 'react'

import './ChatElement.scss'
import { LocalStorageType } from '../../../Types/GeneralTypes'

type PropsType = {
  name: string,
  message: string
}

const ChatElement: React.FC<PropsType> = ({ name, message }) => {

  const localStor: LocalStorageType = JSON.parse(localStorage.getItem('profile') || '[]')
  const [user, setUser] = useState(localStor)

  return (
    <div className={`main ${user.result.fullName === name ? 'right' : 'left'}`}>
      <div className='name'> {name} </div>
      <div className='message'> {message} </div>
    </div>
  )
}

export default ChatElement