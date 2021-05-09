import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import io from 'socket.io-client'

import { chatActions, getChatAction } from "./../../../redux/actions/chatActions"
import ChatContainer from './ChatContainer/ChatContainer'
import InputForm from './InputForm/InputForm'
import './Style.css'

const CONNECTION_PORT = 'localhost:5000'
export let socket;

const Chat = () => {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    socket = io(CONNECTION_PORT)
    socket.emit('join_room', user.result.company)
  }, [user.result.company])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      dispatch(chatActions.createChat(data))
    })
  })

  useEffect(() => {
    dispatch(getChatAction(user.result.company))
  }, [user.result.company, dispatch])

  return (
    <div className='outerContainer'>
      <div className='container'><ChatContainer /></div>
      <div><InputForm /></div>
    </div>
  )
}

export default Chat