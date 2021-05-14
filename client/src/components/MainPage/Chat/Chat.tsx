import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import io, { Socket } from 'socket.io-client'

import { chatActions, getChatAction } from "../../../redux/actions/chatActions"
import ChatContainer from './ChatContainer/ChatContainer'
import InputForm from './InputForm/InputForm'
import './Chat.scss'

const CONNECTION_URL = 'localhost:5000'
export let socket: typeof Socket;
type ReceiveMessageType = {
  _id: string
  room: string
  user: {
    createdAt: string
    updatedAt: string
    isAdmin: boolean
    _id: string
    firstName: string
    lastName: string
    fullName: string
    email: string
    company: string
    companyId: string
    password: string
    __v: number
  }
  message: string
  __v: number
}

const Chat = () => {

  const dispatch = useDispatch()
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    socket = io(CONNECTION_URL)
    socket.emit('join_room', user.result.company)
  }, [user.result.company])

  useEffect(() => {
    socket.on('receive_message', (data: ReceiveMessageType) => {
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